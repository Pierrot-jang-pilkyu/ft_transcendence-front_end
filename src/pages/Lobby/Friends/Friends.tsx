import { useNavigate } from 'react-router-dom';
import styles from "./Friends.module.css";
// import styles from "./Menu.module.css";
import SearchFriends from "../../../assets/SearchFriends.svg";
import FriendsArrow from "../../../assets/FriendsArrow.svg";
import FriendsAdd from "../../../assets/FriendsAdd.svg";

function Menu()
{
	const navigate = useNavigate();

	const handlerButton = () => {
		// navigate('/Mode')
		navigate('/Game')
	};

	return (
        <div className={styles.container}>
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
					<div className={styles.input_container}>
						<div className="input-group">
							<input type="text" placeholder="Search…" className="input input-bordered" />
							<button className="btn btn-square">
								<svg width="100%" height="100%" viewBox="0 0 36 36" fill="" xmlns="http://www.w3.org/2000/svg">
									<rect width="36" height="36" rx="4" fill="#285ADA"/>
									<path d="M12 18H18M18 18H24M18 18V12M18 18V24" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Menu;
