import styles from "./inputModal.module.css";
import React from "react";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IdContext } from "../App";
import QRModal from "./QRModal";

function InputModal({ onClose, code, onOpenModal }) {
  const [textError, setTextError] = useState(false);
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleOpenQRModal = () => {
    onOpenModal();
  };

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3000/auth/login", {
        code: code,
      })
      .then((response) => console.log(response.data));
  }, []);

  const [text, setText] = useState();
  const [id, setId] = useContext(IdContext);

  function onChangeText(event) {
    setText(event.target.value);
  }

  const navigate = useNavigate();
  function onClick() {
    console.log(text);
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3000/auth/2fa", {
        code: text,
      })
      .then((res) => {
        setId(res.data.id);
        navigate("/Loading");
      })
      .catch((error) => {
        setTextError(true);
        setTimeout(() => {
          setTextError(false); // 400ms 후에 다시 false로 설정하여 흔들림 효과 제거
        }, 400);
        console.log(error);
      });
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
              <span className={`${styles.logo}`}>PIN 입력</span>
            </div>
            <div className={`${styles.logoline}`} />
            <div className={`${styles.close}`} onClick={onClose}></div>
            <div className={`${styles.inputcontainer}`}>
              <input
                type="text"
                placeholder="PIN번호 입력해주세요"
                className={`${styles.input} ${
                  textError ? styles["shake-animation"] : ""
                }`}
                onChange={onChangeText}
                onKeyUp={handleOnKeyPress}
              />
            </div>
            <div className={`${styles.enter}`}>
              <button className={`${styles.btn}`} onClick={onClick}>
                입력
              </button>
            </div>
            <div className={`${styles.qr}`}>
              <div className={`${styles.link}`} onClick={onOpenModal}>
                QR code 등록
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InputModal;
