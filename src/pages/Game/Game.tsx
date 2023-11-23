import Header from "./Header/Header";
import styles from "./Game.module.css";
import GameBar from "./GameBar/GameBar";
import Screen from "./Screen/Screen";
import { useContext } from "react";

function Game() {
  return (
    <div className={`${styles.container}`}>
      <Header />
      <Screen />
      {/* <GameBar/> */}
    </div>
  );
}

export default Game;
