import styles from "./AddAndAccept.module.css";

function FriendsRequestModal(props: any) {
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleFriendClose();
    }
  };
  const handleFriendClose = () => {
    props.socket.emit("REFUSE_FRIEND", props.data);
    props.onClose();
  };
  const handleFriendAccept = () => {
    props.socket.emit("ACCEPT_FRIEND", props.data);
    props.onClose();
  };
  return (
    <div className={`${styles.popup_wrap}`} onClick={handleOutsideClick}>
      <div className={`${styles.popup}`}>
        <div className={`${styles.logo}`}>친구 초대요청</div>
        <div className={`${styles.logoline}`} />
        <div className={`${styles.avatar_container}`}>
          <img
            className={`${styles.avatar_image}`}
            src={props.data == undefined ? null : props.data.avatar}
          ></img>
          <div className={`${styles.avatar_name}`}>{props.data.name}</div>
        </div>
        <div className={`${styles.button_container}`}>
          <button
            className={`${styles.button_close}`}
            onClick={handleFriendClose}
          >
            취소
          </button>
          <button
            className={`${styles.button_accept}`}
            onClick={handleFriendAccept}
          >
            친구 수락하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default FriendsRequestModal;
