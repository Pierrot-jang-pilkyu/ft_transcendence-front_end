import Header from "./Header/Header";
import styles from "./Game.module.css";
import GameBar from "./GameBar/GameBar";
import Screen from "./Screen/Screen";
import { IsOpenExcludeGame } from "../../App";
import { useContext } from "react";


function Game()
{
	const [IsOpen, setOpen] = useContext(IsOpenExcludeGame);
	setOpen(false);	
	return (
		<div className={`${styles.container}`}>
			<Header/>
			<Screen />
			{/* <GameBar/> */}
		</div>
	);
}

export default Game;
