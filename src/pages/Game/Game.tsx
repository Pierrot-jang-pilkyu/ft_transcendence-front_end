import Header from "./Header/Header";
import styles from "./Game.module.css";
import Loading from "./Loading/Loading";
import Setting from "./Setting/Setting";
import Gaming from "./Gaming/Gaming";
import { useLoaderData, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { socket, GameRoom, GameContext, GameModalContext } from "./Utils"
import { IdContext } from "../../App";
import Reloading from "./Reloading/Reloading";
import RankMatch from "./RankMatch/RankMatch";
import FriendMatch from "./FriendMatch/FriendMatch";


function Game()
{
	const [id, setId] = useContext(IdContext);
	const [gameModal, setGameModal] = useState<any>({open:false, content:null});
	const invite = useLocation().state.invite;
	const [game, setGame] = useState<any>();

	useEffect(()=>{
		socket.connect()
		socket.emit("REGIST", parseInt(id));
		console.log(invite);

		return (()=>{
			socket.disconnect();
		});
	}, [])

	return (
		<>
			<GameModalContext.Provider value={[gameModal, setGameModal] as any}>
				<GameContext.Provider value={[game, setGame] as any}>
					<div className={`${styles.container}`}>
						<Header/>
						{ !game && <Reloading/> }
						{ game && !(game.room) && (!invite ? <RankMatch/> : <FriendMatch invite={invite}/>) }
						{ game && game.room && game.room.start == false && <Setting /> }
						{ game && game.room && game.room.start == true && <Gaming /> } 
					</div>
					{gameModal.open && gameModal.content}
				</GameContext.Provider>
			</GameModalContext.Provider>
		</>
	);
}

export default Game;