import Header from "./Header/Header";
import styles from "./Game.module.css";
import ChattingRoom from "./ChattingRoom/ChattingRoom";
import Screen from "./Screen/Screen";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "./Socket"

function Game()
{
	const {state} = useLocation();
	const [info, setInfo] = useState(null);

	function onBeforeUnload (event) {
		event.preventDefault();
		event.returnValue = true;
	};

	useEffect(()=>{
		socket.connect();
		socket.on("ROOM", function (data) {
			setInfo(data) 
			window.addEventListener("beforeunload", onBeforeUnload);
		});
		socket.emit("REGIST", parseInt(state));
		socket.emit("MATCH", parseInt(state));	
		return (()=>{
			socket.disconnect();
			window.removeEventListener("beforeunload", onBeforeUnload);
		})
	}, [])

	useEffect(()=> {

	})
	return (
		<div className={`${styles.container}`}>
			<Header/>
			{ info != null && <Screen gameInfo={info}/> }
			{ info != null && <ChattingRoom opposite={info.opposite}/> }
		</div>
	);
}

export default Game;