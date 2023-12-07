import Header from "./Header/Header";
import styles from "./Game.module.css";
import Loading from "./Loading/Loading";
import Setting from "./Setting/Setting";
import Gaming from "./Gaming/Gaming";
import { useLoaderData, useLocation } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { socket, GameRoom, GameContext } from "./Utils"
import { IdContext } from "../../App";


function Game()
{
	const [id, setId] = useContext(IdContext);
	const state = useLocation().state;
	const roomId:string = state.roomId;
	const gameRequest:any = state.gameRequest;
	const [game, setGame] = useState( { room: { roomId: roomId, start: null }, isLeft: null });

	useEffect(()=>{
		console.log(state);
		socket.connect()
		socket.emit("REGIST", parseInt(id));

		return (()=>{
			socket.disconnect();
		});
	}, [])

	return (
		<GameContext.Provider value={[game, setGame] as any}>
			<div className={`${styles.container}`}>
				<Header/>
				{ game.room.start == null && <Loading gameRequest={gameRequest}/> }
				{ game.room.start == false && <Setting /> }
				{ game.room.start == true && <Gaming /> } 
			</div>
		</GameContext.Provider>
	);
}

export default Game;