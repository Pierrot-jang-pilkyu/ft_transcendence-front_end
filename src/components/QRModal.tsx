import styles from "./QRModal.module.css";
import { useState, useRef, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface QRModalProps {
  onClose: () => void; // onClose prop의 타입을 함수 타입으로 지정
}

function QRModal({ onClose }) {
  const [text, setText] = useState();
  const navigate = useNavigate();
  const [qr, setQr] = useState();

  function onChangeText(event) {
    setText(event.target.value);
  }

  function onClick() {
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

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    fetch("http://localhost:3000/auth/2fa/generate", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        const reader = response.body.getReader();
        return new ReadableStream({
          start(controller) {
            return pump();
            function pump() {
              return reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                return pump();
              });
            }
          },
        });
      })
      .then((stream) => new Response(stream))
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((url) => setQr(url))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="modal" onClick={handleOutsideClick}>
      <div className="modal-content">
        <div className={`${styles.popup_wrap}`}>
          <div className={`${styles.popup}`}>
            <div>
              <span className={`${styles.logo}`}>QR 인증</span>
            </div>
            <img src={qr} className={`${styles.qr}`} />
            <div className={`${styles.logoline}`} />
            <div className={`${styles.close}`} onClick={onClose} />
            <div className={`${styles.inputcontainer}`}>
              <input
                type="text"
                placeholder="Type here"
                className={`${styles.input}`}
                onChange={onChangeText}
              />
            </div>
            <div className={`${styles.enter}`}>
              <button className={`${styles.btn}`} onClick={onClick}>
                submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRModal;

// const [text, setText] = useState();

// function onChangeText (event) {
//   setText(event.target.value);
// }

// function onClick () {
//   axios.defaults.withCredentials = true;
//   axios.post('http://localhost:3000/auth/2fa', {
//     code: text,
//   })
//   .then((res)=> {navigate('/Lobby')})
//   .catch((error)=>{console.log(error);})
// }
