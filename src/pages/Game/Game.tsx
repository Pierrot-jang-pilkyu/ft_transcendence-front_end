import Header from "./Header/Header";
import styles from "./Game.module.css";
import ChattingRoom from "./ChattingRoom/ChattingRoom";
import Loading from "./Loading/Loading";
import Setting from "./Setting/Setting";
import Gaming from "./Gaming/Gaming";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket, Status } from "./Utils"


function Game()
{
	const userId:number = useLocation().state;
	const [status, setStatus] = useState(Status.Loading);
	const [room, setRoom] = useState(null);

	function onBeforeUnload (event:any) {
		event.preventDefault();
		socket.emit("PAUSE");
		event.returnValue = true;
	};

	useEffect(()=>{
		socket.connect();
		window.addEventListener("beforeunload", onBeforeUnload);

		return (()=>{
			socket.disconnect();
			window.removeEventListener("beforeunload", onBeforeUnload);
		});
	}, [])

	return (
		<div className={`${styles.container}`}>
			<Header/>
			{ status == Status.Loading && <Loading setRoom={setRoom} setStatus={setStatus} userId={userId} /> }
			{ status == Status.Setting && <Setting setRoom={setRoom} setStatus={setStatus}/> }
			{ status == Status.Gaming && <Gaming room={room}/> }
			{/* { status != Status.Loading  && <ChattingRoom opposite={}/> } */}
		</div>
	);
}

export default Game;