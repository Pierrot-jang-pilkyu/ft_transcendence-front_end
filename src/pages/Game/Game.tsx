import Header from "./Header/Header";
import styles from "./Game.module.css";
import ChattingRoom from "./ChattingRoom/ChattingRoom";
import Screen from "./Screen/Screen";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Game()
{
	const { state } = useLocation();

	return (
		<div className={`${styles.container}`}>
			<Header userId={state}/>
			{/* <Screen userId={state}/> */}
			<ChattingRoom />
		</div>
	);
}

export default Game;