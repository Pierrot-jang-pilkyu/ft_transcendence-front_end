import { useNavigate } from 'react-router-dom';
import styles from "./Menu.module.css";
import GameStart from "../../../assets/GameStart.svg";
import ChattingRoom from "../../../assets/Chatting.svg";
import FriendsList from './Friends/FriendsList';

function Menu(props:any)
{
	const navigate = useNavigate();

	const handlerButton = () => {
		// navigate('/Mode')
		navigate('/Game')
	};

	const handlerButtonChatting = () => {
		navigate('/Chatting')
	};

	return (
	<div className={`${styles.container}`}>
		<button className={`${styles.button} ${styles.game}`} onClick={handlerButton}>
			<img className={styles.game_img} src={GameStart}></img>
			<div className={`${styles.game_font}`}>Start Game!</div>
		</button>
		<button className={`${styles.button} ${styles.chat}`} onClick={handlerButtonChatting}>
				<img src={ChattingRoom} className={`${styles.chat_img}`}/>
				<div className={`${styles.chat_font}`}>Chatting<br/>Room</div>
		</button>
		<FriendsList friendObjects={props.friendObjects}/>
	</div>
	);
}

export default Menu;
