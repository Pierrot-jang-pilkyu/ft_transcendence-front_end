import MatchHistory from "./Match History/MatchHistory";
import styles from "./GameBar.module.css";

function GameBar()
{
    return (
        <div className={`${styles.container}`}>
            <MatchHistory leftflag={true}/>
            <div className={`${styles.chatTmp}`}></div>
            <MatchHistory leftflag={false}/>
        </div>
    )
}

export default GameBar;