import { useNavigate } from 'react-router-dom';
import styles from "./Menu.module.css";
import GameStart from "../../../assets/GameStart.svg";
import ChattingRoom from "../../../assets/Chatting.svg";
import SearchFriends from "../../../assets/SearchFriends.svg";
import FriendsArrow from "../../../assets/FriendsArrow.svg";

function Menu()
{
	const navigate = useNavigate();

	const handlerButton = () => {
		// navigate('/Mode')
		navigate('/Game')
	};

	const handlerButtonFriends = () => {
		// navigate('/Mode')
		navigate('/Friends')
	};

	return (
	<div className={`${styles.buttons}`}>
		<button className={`${styles.button} ${styles.game}`} onClick={handlerButton}>
			<img src={GameStart}></img>
			<div className={`${styles.game_font}`}>Start Game!</div>
		</button>
		<button className={`${styles.button} ${styles.chat}`}>
				<img src={ChattingRoom}/>
				<div className={`${styles.chat_font}`} onClick={handlerButtonFriends}>Chatting Room</div>
		</button>
		<div className="drawer drawer-end">
            	<input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content">
					{/* Page content here */}
					<label htmlFor="my-drawer-4" className={`${styles.button} ${styles.friend} ${styles.friend_font}` }>
						<img src={SearchFriends}></img>
						<div className={`${styles.friend_font}`}>Search Friends</div>
						<img src={FriendsArrow}></img>
					</label>
				</div> 
				<div className="drawer-side">
					<label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
					<ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
						{/* Sidebar content here */}
						<li><a>Sidebar Item 1</a></li>
						<li><a>Sidebar Item 2</a></li>
					</ul>
				</div>
			</div>
	</div>
	);
}

export default Menu;
