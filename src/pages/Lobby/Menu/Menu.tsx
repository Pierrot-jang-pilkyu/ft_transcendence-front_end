import styles from "./Menu.module.css";
import GameStart from "../../../assets/GameStart.svg";
import ChattingRoom from "../../../assets/Chatting.svg";
import SearchFriends from "../../../assets/SearchFriends.svg";
import FriendsArrow from "../../../assets/FriendsArrow.svg";

function Menu()
{
	return (
	<div className={`${styles.buttons}`}>
		<button className={`${styles.button} ${styles.game}`}>
			<img src={GameStart}></img>
			<div className={`${styles.game_font}`}>Start Game!</div>
		</button>
		<button className={`${styles.button} ${styles.chat}`}>
				<img src={ChattingRoom}/>
				<div className={`${styles.chat_font}`}>Chatting Room</div>
		</button>
		<button className={`${styles.button} ${styles.friend}`}>
			<img src={SearchFriends}></img>
			<div className={`${styles.friend_font}`}>Search Friends</div>
			<img src={FriendsArrow}></img>
		</button>
	</div>
	);
}

export default Menu;
