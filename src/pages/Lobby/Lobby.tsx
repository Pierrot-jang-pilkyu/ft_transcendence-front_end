import styles from "./Lobby.module.css";
import Profile from "./Profile/Profile";
import Header from "../../components/Header";
import Menu from "./Menu/Menu";
// import HomeBall from "../../assets/HomeBall.png";

function Lobby()
{
	return (
		<div className={`${styles.background}`}>
			{/* <img className={`${styles.img}`} src={HomeBall}/> */}
			<Header />
			<div className={`${styles.menu_container}`}>
				<Menu />
			</div>
			<Profile name="James Morrison" win="362" lose="231" rank="32" />
		</div>
	)
}

export default Lobby;
