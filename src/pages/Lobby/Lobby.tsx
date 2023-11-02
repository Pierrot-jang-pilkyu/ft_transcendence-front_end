import Header from "../../components/Header";
import styles from "./Lobby.module.css";
import Profile from "./Profile/Profile";
import Ranking from "./Ranking/Ranking";
import Menu from "./Menu/Menu";
// import Friends from "./Friends/Frends"
// import HomeBall from "../../assets/HomeBall.png";

interface FriendProps {
	name: string;
	img: string;
}

function Lobby()
{
	// const Objects = [ { name: "pjang", img: "src/assets/img_Profile.png" },  { name: "sehjang", img: "src/assets/react.svg" }];
	// const Objects:any = [ { name: "pjang", img: "src/assets/img_Profile.png" },  { name: "sehjang", img: "src/assets/react.svg" }];
	// const Objects:any[] = [ { name: "pjang", img: "src/assets/img_Profile.png" },  { name: "sehjang", img: "src/assets/react.svg" }];
	const Objects:FriendProps[] = [ { name: "pjang", img: "src/assets/img_Profile.png" },  { name: "sehjang", img: "src/assets/react.svg" }];
	return (
		<div className={`${styles.background}`}>
			{/* <img className={`${styles.img}`} src={HomeBall}/> */}
			<Header />
			<Profile name="James Morrison" win="362" lose="231" rank="32" />
			<div className={`${styles.ranking_container}`}>
				<Ranking button="View More "/>
			</div>
			<div className={`${styles.menu_container}`}>
				<Menu friendObjects={Objects}/>
			</div>
		</div>
	)
}

export default Lobby;
