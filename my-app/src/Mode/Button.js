import styles from "./Button.module.css"
import React from 'react';

function Button(props) {
	return (
		<button className={styles.button}  onClick={props.handler}>{props.name}</button>
	);
}

export default Button;
