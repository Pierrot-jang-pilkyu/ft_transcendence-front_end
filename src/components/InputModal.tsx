import styles from "./inputModal.module.css";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QRModal from "./QRModal";

function InputModal({ onClose, code, onOpenModal }) {
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
        navigate("/Lobby");
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
                className={`${styles.input}`}
                onChange={onChangeText}
              />
            </div>
            <div className={`${styles.enter}`}>
              <button className={`${styles.btn}`} onClick={onClick}>
                입력
              </button>
            </div>
            <div className={`${styles.qr}`}>
              <text className={`${styles.link}`} onClick={onOpenModal}>
                QR code 등록
              </text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InputModal;
