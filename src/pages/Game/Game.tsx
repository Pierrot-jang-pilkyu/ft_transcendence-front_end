import Canvas from "./Canvas";
import Header from "../../components/Header";
import styles from "./Game.module.css";

function Game()
{
	return (
		<div className={`${styles.background}`}>
			<Header/>
			<div className={`${styles.canvas}`}>
				<Canvas/>
			</div>
		</div>
	);
}

export default Game;
