import { useNavigate } from 'react-router-dom';
import styles from "./Profile.module.css"
// import React from 'react';

function Profile() {

	const navigate = useNavigate();

	const handlerButton = () => {
		navigate('/Mode')
	};

	return (
		<button className={styles.button} onClick={handlerButton}></button>
	);
}

export default Profile;
