import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback  } from 'react';
import styles from "./Menu.module.css";
import GameStart from "../../../assets/GameStart.svg";
import ChattingRoom from "../../../assets/Chatting.svg";
import SearchFriends from "../../../assets/SearchFriends.svg";
import FriendsArrow from "../../../assets/FriendsArrow.svg";
import FriendsAdd from "../../../assets/FriendsAdd.svg";

import axios from 'axios';

function Menu(props:any)
{
	const [nick, setNick] = useState('');
	const [data, setData] = useState();
	const avatars:any = [];

	// const avatars = () =>  {
	// 	const res:any = [];
	// 	return res;
	// };

	const changeAvatar = () => {
		for (let i = 0; i < props.friendObjects.length; ++i)
		{
			avatars.push(<li><Avatar name={props.friendObjects[i].name} img={props.friendObjects[i].img} state={props.friendObjects[i].state} /></li>);
			// console.log('name: ' + props.friendObjects[i].name + ', img_src: ' + props.friendObjects[i].img);
		}
	};
		
	const addFriendList = (nickName:any, img:any, state:any) => {
		avatars.push(<li><Avatar name={nickName} img={img} state={state}/></li>);
	};

	const onChange = (e:any) => {
		setNick(e.target.value);
		// test();
	};

	const onAddButton = () => {
		setNick('');
		if (nick === '')
		{
			alert("warning");
			return '';
		}
		// 백엔드 
	};
	
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
