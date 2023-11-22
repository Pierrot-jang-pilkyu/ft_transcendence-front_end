import styles from "./RoomAddModal.module.css";
import React from "react";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RoomAddModal({ onClose, id }) {
  const [textError, setTextError] = useState(false);
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    
  }, []);

  const [name, setName] = useState();
  const [pw, setPw] = useState();

  function onChangeName(event) {
    setName(event.target.value);
  }

  function onChangePw(event) {
    setPw(event.target.value);
  }

  const navigate = useNavigate();
  function onClick() {
    console.log(name);
    console.log(pw);
    
  }

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  return (
    <div className="modal" onClick={handleOutsideClick}>
      <div className="modal-content">
        <div className={`${styles.popup_wrap}`}>
          <div className={`${styles.popup}`}>
            <div>
              <span className={`${styles.logo}`}>방 생성</span>
            </div>
            <div className={`${styles.logoline}`} />
            <div className={`${styles.close}`} onClick={onClose}></div>
            <div className={`${styles.inputcontainer_name}`}>
              <input
                type="text"
                placeholder="방이름을 입력해주세요."
                className={`${styles.input} ${
                  textError ? styles["shake-animation"] : ""
                }`}
                onChange={onChangeName}
                onKeyUp={handleOnKeyPress}
              />
            </div>
            <div className={`${styles.inputcontainer_pw}`}>
              <input
                type="text"
                placeholder="비밀번호를 입력해주세요."
                className={`${styles.input} ${
                  textError ? styles["shake-animation"] : ""
                }`}
                onChange={onChangePw}
                onKeyUp={handleOnKeyPress}
              />
            </div>
            <div className={`${styles.enter}`}>
              <button className={`${styles.btn}`} onClick={onClick}>
                생성
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RoomAddModal;