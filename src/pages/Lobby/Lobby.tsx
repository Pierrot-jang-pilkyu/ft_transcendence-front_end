import styles from "./Lobby.module.css";
import Profile from "./Profile";
import Header from "../../components/Header";
// import HomeBall from "../../assets/HomeBall.png";

function Home()
{
	return (
		<div className={`${styles.background}`}>
			{/* <img className={`${styles.img}`} src={HomeBall}/> */}
			<Header />
			<div className={`${styles.profile_container}`}>
				{/* <div className={`${styles.title}`}>Deer Feer</div> */}
                <div className={`${styles.profile_img}`}></div>
                <div className={`${styles.profile_second}`}>
                    <div className={`${styles.profile_name}`}>James Morrison</div>
                	<div className={`${styles.profile_win}`}>Win:</div>
                	<div className={`${styles.profile_lose}`}>Lose:</div>
                </div>
				<Profile />
			</div>
		</div>
	)
}

export default Home;
