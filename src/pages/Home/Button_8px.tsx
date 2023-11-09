import { useNavigate } from "react-router-dom";
import styles from "./Button_8px.module.css";
import { useState, useRef } from "react";

function Button(props: any) {
  const navigate = useNavigate();

  //   const handlerButton = () => {
  //     navigate("/Lobby");
  //   };
  const [data, setData] = useState();

  const url =
    "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-6798a857fa8ededdcc18f1b2b5b4acc4a18f991c6af614a8824427676e35707d&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2F&response_type=code";
  return (
    // <button className={`${styles.button}`} onClick={props.onOpenModal}>
    //   {props.name}
    // </button>
    <a href={url} className={styles.button}>
      {props.name}
    </a>
  );
}

export default Button;
