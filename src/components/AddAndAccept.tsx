import styles from "./AddAndAccept.module.css";

function AddAndAccept({ socket, modalType, onClose, data }) {
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (modalType === "REQUEST_FRIEND") {
        handleFriendClose();
      } else if (modalType === "INVITE") {
        handleGameClose();
      }
    }
  };
  let modalContent;
  const handleFriendClose = () => {
    socket.emit("REFUSE_FRIEND", data);
    onClose();
  };
  const handleFriendAccept = () => {
    socket.emit("ACCEPT_FRIEND", data);
    onClose();
  };
  const handleGameClose = () => {
    socket.emit("REFUSE_GAME", data);
    onClose();
  };
  const handleGameAccept = () => {
    socket.emit("ACCPET_GAME", data);
    onClose();
  };

  if (modalType === "REQUEST_FRIEND") {
    modalContent = (
      <div>
        <div className={`${styles.logo}`}>친구 초대요청</div>
        <div className={`${styles.logoline}`} />
        <div className={`${styles.avatar_container}`}>
          <img
            className={`${styles.avatar_image}`}
            src={data == undefined ? null : data.avatar}
          ></img>
          <div className={`${styles.avatar_name}`}>{data.name}</div>
        </div>
        <div className={`${styles.button_container}`}>
          <button
            className={`${styles.button_close}`}
            onClick={handleFriendClose}
          >
            취소
          </button>
          <div
            className={`${styles.button_accept}`}
            onClick={handleFriendAccept}
          >
            친구 수락하기
          </div>
        </div>
      </div>
    );
  } else if (modalType === "INVITE") {
    modalContent = (
      <div>
        <div className={`${styles.logo}`}>게임 초대요청</div>
        <div className={`${styles.logoline}`} />
        <div className={`${styles.avatar_container}`}>
          <img
            className={`${styles.avatar_image}`}
            src={data == undefined ? null : data.avatar}
          ></img>
          <div className={`${styles.avatar_name}`}>{data.name}</div>
        </div>
        <div className={`${styles.button_container}`}>
          <button
            className={`${styles.button_close}`}
            onClick={handleGameClose}
          >
            취소
          </button>
          <div className={`${styles.button_accept}`} onClick={handleGameAccept}>
            게임 수락하기
          </div>
        </div>
      </div>
    );
  }
  //   avatar부분에 닉네임과 아바타를 따와서 넣어줘야하는데 아직 방법을 모르니 남겨두고 처리
  return (
    <div className={`${styles.popup_wrap}`} onClick={handleOutsideClick}>
      <div className={`${styles.popup}`}>{modalContent}</div>
    </div>
  );
}

export default AddAndAccept;
