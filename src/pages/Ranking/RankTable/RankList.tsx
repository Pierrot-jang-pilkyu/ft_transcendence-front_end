import { useNavigate } from "react-router-dom";
import styles from "./RankList.module.css";

function RankList(props: any) {
  const navigate = useNavigate();
  const handlerButton = () => {
    navigate(`/FriendProfile/${props.id}`);
  };
  return (
    <div className={`${styles.listcontainer}`}>
      <text className={`${styles.listnum}`}>{props.rank}</text>
      <div className={`${styles.listnick}`} onClick={handlerButton}>
        {props.nickname}
      </div>
      <text className={`${styles.winnum}`}>{props.win}</text>
      <text className={`${styles.slash}`}>{props.win == null ? "" : "/"}</text>
      <text className={`${styles.losenum}`}>{props.lose}</text>
      <text className={`${styles.divide}`}>
        {props.lose == null ? "" : "|"}
      </text>
      <text className={`${styles.point}`}>{props.score}</text>
    </div>
  );
}

export default RankList;
