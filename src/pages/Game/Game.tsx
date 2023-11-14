import Header from "./Header/Header";
import styles from "./Game.module.css";
import Canvas from "./Canvas/Canvas";
import GameBar from "./GameBar/GameBar";

function Game()
{
	return (
		<div className={`${styles.container}`}>
			<Header/>
			<Canvas/>
			<GameBar/>
		</div>
	);
}

export default Game;
