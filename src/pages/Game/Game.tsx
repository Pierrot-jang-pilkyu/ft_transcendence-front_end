import Header from "./Header/Header";
import styles from "./Game.module.css";
import Loading from "./Loading/Loading";
import Setting from "./Setting/Setting";
import Gaming from "./Gaming/Gaming";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket, GameRoom, GameContext } from "./Utils"


function Game()
{
	const userId = useLocation().state.userId;
	const roomId:string = useLocation().state.roomId;
	const [game, setGame] = useState( { room: { roomId: roomId, start: null }, isLeft: null });

	useEffect(()=>{
		socket.connect()
		socket.emit("REGIST", parseInt(userId));

		return (()=>{
			socket.disconnect();
		});
	}, [])

	return (
		<GameContext.Provider value={[game, setGame] as any}>
			<div className={`${styles.container}`}>
				<Header/>
				{ game.room.start == null && <Loading /> }
				{ game.room.start == false && <Setting /> }
				{ game.room.start == true && <Gaming /> } 
			</div>
		</GameContext.Provider>
	);
}

export default Game;