import Header from "./Header/Header";
import styles from "./Game.module.css";
import Setting from "./Setting/Setting";
import Gaming from "./Gaming/Gaming";
import { useLocation } from "react-router-dom";
import {  useContext, useEffect, useState } from "react";
import { socket, GameContext, GameModalContext } from "./Utils"
import Reloading from "./Reloading/Reloading";
import RankMatch from "./RankMatch/RankMatch";
import FriendMatch from "./FriendMatch/FriendMatch";
import axios from "axios";
import { LoginContext } from "../../App";


function Game()
{
	const [gameModal, setGameModal] = useState<any>({open:false, content:null});
	const invite = useLocation().state.invite;
	const [game, setGame] = useState<any>();
	const [login, setLogin] = useContext<any>(LoginContext);


	useEffect(()=>{
		socket.on("NOTICE", (data) => {
			switch (data.code) {
				case 201:
					axios.defaults.withCredentials = true;
					axios.post("http://" + import.meta.env.VITE_BACKEND + "/auth/logout")
					.then(() => {setLogin(false)})
					.catch(() => {setLogin(false)})
					break;
				case 202:
					socket.disconnect();
					axios.get("http://" + import.meta.env.VITE_BACKEND + "/auth/refresh/2fa")
					.then(()=>{socket.connect()})
					.catch(() => {setLogin(false)});
					break;
			}
		})

		socket.connect();
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
