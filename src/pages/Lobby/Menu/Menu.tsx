import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback  } from 'react';
import styles from "./Menu.module.css";
import GameStart from "../../../assets/GameStart.svg";
import ChattingRoom from "../../../assets/Chatting.svg";
import SearchFriends from "../../../assets/SearchFriends.svg";
import FriendsArrow from "../../../assets/FriendsArrow.svg";
import FriendsAdd from "../../../assets/FriendsAdd.svg";

import axios from 'axios';

import FriendsList from './Friends/FriendsList';

function Menu(props:any)
{
	const navigate = useNavigate();
  const handlerButton = () => {
    // navigate('/Mode')
    navigate("/Game");
  };
  const handlerButtonChatting = () => {
    navigate("/Chatting");
  };
  
	return (
	<div className={`${styles.container}`}>
		<button className={`${styles.button} ${styles.game}`} onClick={handlerButton}>
			<img className={styles.game_img} src={GameStart}></img>
			<div className={`${styles.game_font}`}>Start Game!</div>
		</button>
		<button id="Chatting_Room" className={`${styles.button} ${styles.chat}`}>
				<img src={ChattingRoom}/>
				<div className={`${styles.chat_font}`} onClick={handlerButtonChatting}>Chatting Room</div>
		</button>
		<FriendsList friendObjects={props.friendObjects}/>
	</div>
	);
}

export default Menu;
