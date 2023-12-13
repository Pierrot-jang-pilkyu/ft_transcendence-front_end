import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Menu.module.css";
import GameStart from "../../../assets/GameStart.svg";
import ChattingRoom from "../../../assets/Chatting.svg";
import FriendsList from "./Friends/FriendsList";
import { useLocation } from "react-router-dom";
import socket from "../../../hooks/socket/socket";

function Menu() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState<React.ReactNode | null>(null);
  const handlerButton = () => {
    navigate("/Game", {state: { invite: null}});
  };
  const handlerButtonChatting = () => {
    navigate("/Chatting");
  };
  //만약 친구추가나 게임초대에 실패하면 알려줄 경고창. 친구창이나 게임초대 화면에 넣을것. 예시
  useEffect(() => {
    const handleNotice = (data) => {
      console.log(data.code);
      if (data.code == 30) {
        setAlert(
          <div role="alert" className={`${styles.alert} ${styles.alert_error}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error! Task failed successfully.</span>
          </div>
        );
        setTimeout(() => {
          setAlert(null);
        }, 10000);
      } else if (data.code == 31) {
        setAlert(
          <div role="alert" className={`${styles.alert} ${styles.alert_error}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error! Task failed successfully.</span>
          </div>
        );
        setTimeout(() => {
          setAlert(null);
        }, 10000);
      }
    };
    socket.on("NOTICE", (data) => handleNotice(data));
  });
  return (
    <div className={`${styles.container}`}>
      <button
        className={`${styles.button} ${styles.game}`}
        onClick={handlerButton}
      >
        <img className={styles.game_img} src={GameStart}></img>
        <div className={`${styles.game_font}`}>Start Game!</div>
      </button>
      <button id="Chatting_Room" className={`${styles.button} ${styles.chat}`} onClick={handlerButtonChatting}>
        <img src={ChattingRoom} />
        <div className={`${styles.chat_font}`}>
          Chatting Room
        </div>
      </button>
      <FriendsList />
      {alert}
    </div>
  );
}

export default Menu;
