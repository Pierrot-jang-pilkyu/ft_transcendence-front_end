import styles from "./AddAndAccept.module.css"

function AddAndAccept({ options, onClose }) {
	const handleOutsideClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
		  onClose();
		}
	  };
	//   avatar부분에 닉네임과 아바타를 따와서 넣어줘야하는데 아직 방법을 모르니 남겨두고 처리
	return (
		<div className={`${styles.popup_wrap}`} onClick={handleOutsideClick}>
			<div className={`${styles.popup}`}>
				<div className={`${styles.logo}`}>{options.subject}</div>
				<div className={`${styles.logoline}`} />
				<div className={`${styles.avatar_container}`}>
					<img className={`${styles.avatar_image}`}src={options == undefined ? null : options.avatar}></img>
					<div className={`${styles.avatar_name}`}>{options.name}</div>
				</div>
				<div className={`${styles.button_container}`}>
					<button className={`${styles.button_close}`} onClick={onClose}>취소</button>
					<div className={`${styles.button_accept}`}>{options.accept}</div>
				</div>
			</div>
		</div>
	);
}

export default AddAndAccept;