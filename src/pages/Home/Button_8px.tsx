import { useNavigate } from 'react-router-dom';
import styles from "./Button_8px.module.css"
import { useState } from 'react';
import axios from 'axios';
// import React from 'react';

function Button(props:any) {

	const navigate = useNavigate();
	const [data, setData] = useState("");

	const handlerButton = () => {
		// navigate('/Mode')
		navigate('/Lobby')
		// const url:string = "/api/auth/login";
		// axios.get(url)
		// 	.then((Response)=>{console.log(Response.data);})
		// 	.catch((Error)=>{console.log(Error);})
	};

	return (
		<button className={styles.button} onClick={handlerButton}>{props.name}</button>
	);
}

export default Button;
