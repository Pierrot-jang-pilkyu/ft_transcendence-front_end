import styles from "./AddAndAccept.module.css"

function AddAndAccept({ onClose }) {
	const handleOutsideClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
		  onClose();
		}
	  };
	return (
		<div className={`${styles.popup_wrap}`} onClick={handleOutsideClick}>
			<div className={`${styles.popup}`}>
				<div className={`${styles.logo}`}>테스트 확인용</div>
				<div className={`${styles.logoline}`} />
				<div className={`${styles.avatar_container}`}></div>
				<div className={`${styles.button_container}`}>
					<button className={`${styles.button_close}`} onClick={onClose}>취소</button>
					<div className={`${styles.button_accept}`}>확인</div>
				</div>
			</div>
		</div>
	);
}

export default AddAndAccept;