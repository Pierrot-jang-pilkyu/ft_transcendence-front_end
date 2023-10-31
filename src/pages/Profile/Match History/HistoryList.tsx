import styles from "./HistoryList.module.css"

function HistoryList(props:any) {
	return (
		<div className={`${styles.listcontainer}`}>
			<div className={props.winflag ? styles.listwin : styles.listlose}>
				{props.winflag ? "Win" : "Lose"}
			</div>
			<div className={`${styles.listtime}`}>{props.matchtime}</div>
			<div className={`${styles.listmatchtext}`}>Match with</div>
			<div className={`${styles.listname}`}>{props.name}</div>
		</div>
	);
}

export default HistoryList