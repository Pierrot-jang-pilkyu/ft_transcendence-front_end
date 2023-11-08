import { useNavigate } from "react-router-dom";
import styles from "./rankList.module.css";

function rankList(props: any) {
  const navigate = useNavigate();

  const handlerButton = () => {
    navigate("/FriendProfile");
  };
  return (
    <div className={`${styles.listcontainer}`}>
      <text className={`${styles.listnum}`}>{props.num}</text>
      <div className={`${styles.listnick}`} onClick={handlerButton}>
        {props.name}
      </div>
      <div className={`${styles.scoretable}`}>
        <text className={`${styles.winnum}`}>{props.winnum}</text>
        <text className={`${styles.slash}`}>/</text>
        <text className={`${styles.losenum}`}>{props.losenum}</text>
        <text className={`${styles.divide}`}>|</text>
        <text className={`${styles.point}`}>Point:{props.point}</text>
      </div>
    </div>
  );
}

export default rankList;
