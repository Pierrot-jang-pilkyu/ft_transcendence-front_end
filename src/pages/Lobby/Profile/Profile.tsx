import { useNavigate } from 'react-router-dom';
import styles from "./Profile.module.css";
import ProfileImg from "../../../assets/img_Profile.png";
import Crown from "../../../assets/Lobby_crown.png";
// import React from 'react';

function Profile(props:any) {

	const navigate = useNavigate();

	const handlerButton = () => {
		navigate('/Lobby')
	};

	return (
		<div className={`${styles.profile_container}`}>
            <div className={`${styles.profile_img}`}></div>
			<img className={`${styles.profile_img}`} src={ProfileImg} />
            <div className={`${styles.profile_second}`}>
               	<div className={`${styles.profile_name}`}>{props.name}</div>
            	<div className={`${styles.profile_win}`}>Win:</div>
            	<div className={`${styles.profile_win_value}`}>{props.win}</div>
            	<div className={`${styles.profile_lose}`}>Lose:</div>
            	<div className={`${styles.profile_lose_value}`}>{props.lose}</div>
            </div>
            <div className={`${styles.profile_line}`}></div>
			<img className={`${styles.profile_crown}`} src={Crown}/>
            <div className={`${styles.profile_rank}`}>Rank:</div>
            <div className={`${styles.profile_rank_value}`}>{props.rank}</div>
			<button className={styles.button} onClick={handlerButton}></button>
		</div>
	);
}

export default Profile;
