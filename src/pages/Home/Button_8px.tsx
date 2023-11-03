import { useNavigate } from 'react-router-dom';
import styles from "./Button_8px.module.css"
import {useState} from 'react'
import axios from 'axios'
// import React from 'react';

function Button(props:any) {

	const navigate = useNavigate();
    const [data, setData] = useState();

	const handlerButton = () => {
		axios.get('http://localhost:3000/')
			.then((Response)=>{console.log(Response.data)})
			.catch((Error)=>{console.log(Error)})
		//navigate('/Lobby')
	};


	return (
		<button className={styles.button} onClick={handlerButton}>{props.name}</button>
	);
}

export default Button;
