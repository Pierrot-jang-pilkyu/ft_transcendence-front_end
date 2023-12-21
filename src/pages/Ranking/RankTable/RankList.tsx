import { useNavigate } from "react-router-dom";
import styles from "./rankList.module.css";

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
      <text className={`${styles.point}`}>{props.score}</text>
    </div>
  );
}

export default RankList;
