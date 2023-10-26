import { useNavigate } from 'react-router-dom';
import styles from "./Button_8px.module.css"
// import React from 'react';

function Button(props:any) {

	const navigate = useNavigate();

	const handlerButton = () => {
		navigate('/MyProfile')
	};

	return (
		<button className={styles.button} onClick={handlerButton}>{props.name}</button>
	);
}

export default Button;
