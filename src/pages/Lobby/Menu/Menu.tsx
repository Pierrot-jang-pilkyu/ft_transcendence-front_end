import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useContext } from "react";
import styles from "./Menu.module.css";
import GameStart from "../../../assets/GameStart.svg";
import ChattingRoom from "../../../assets/Chatting.svg";
import SearchFriends from "../../../assets/SearchFriends.svg";
import FriendsArrow from "../../../assets/FriendsArrow.svg";
import FriendsAdd from "../../../assets/FriendsAdd.svg";
import axios from "axios";
import FriendsList from "./Friends/FriendsList";

import { useLocation } from "react-router-dom";
import socket from "../../../hooks/socket/socket";
import { IdContext } from "../../../App";

function Menu(props: any) {
  const { state } = useLocation();
  const [id, setId] = useContext(IdContext);

  const navigate = useNavigate();
  const handlerButton = () => {
    navigate("/Game", {state: { userId: id, invite: {roomId: null, gameRequest: null }}});
    // console.log(state);
    // console.log("Click");
    // socket.emit("REQUEST_FRIEND", { userId: parseInt(state), target: "frank" });
  };
  const handlerButtonChatting = () => {
    navigate("/Chatting");
  };

  return (
    <div className={`${styles.container}`}>
      <button
        className={`${styles.button} ${styles.game}`}
        onClick={handlerButton}
      >
        <img className={styles.game_img} src={GameStart}></img>
        <div className={`${styles.game_font}`}>Start Game!</div>
      </button>
      <button id="Chatting_Room" className={`${styles.button} ${styles.chat}`}>
        <img src={ChattingRoom} />
        <div className={`${styles.chat_font}`} onClick={handlerButtonChatting}>
          Chatting Room
        </div>
      </button>
      <FriendsList friendObjects={props.friendObjects} />
    </div>
  );
}

export default Menu;
