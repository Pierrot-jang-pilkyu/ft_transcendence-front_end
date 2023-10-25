import styles from "./Button.module.css"
import React from 'react';

function Button(props) {
	return (
		<button className={styles.button}>{props.name}</button>
	);
}

export default Button;
