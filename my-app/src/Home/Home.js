import styles from "./Home.module.css";
import Button from "./Button_8px.js";
import Header from "./Header.js";
// import Ball from "./img.png";

function Home()
{
	return (
		<div className={`${styles.background}`}>
			{/* <img className={`${styles.img}`} src={Ball}/> */}
			<Header/>
			<div className={`${styles.main}`}>
				<div className={`${styles.title}`}>D or Feer  P__ong</div>
				<Button name="login"/>
			</div>
		</div>
	)
}

export default Home;
