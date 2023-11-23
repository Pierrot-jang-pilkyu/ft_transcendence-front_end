import { useNavigate } from "react-router-dom";
import styles from "./Button_8px.module.css";
import { useState, useRef } from "react";

function Button(props: any) {
  const navigate = useNavigate();

  const handlerButton = () => {
    navigate("/AfterLogin");
  };
  const [data, setData] = useState();

  const url =
    "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-a52635ac8449682c22179ea5e0431a5774a227ee77023467493b98e1df02b70b&redirect_uri=http%3A%2F%2Flocalhost%3A5173&response_type=code";
  return (
    <button className={`${styles.button}`} onClick={handlerButton}>
      {props.name}
    </button>
    // <a href={url} className={styles.button}>
    //   {props.name}
    // </a>
  );
}

export default Button;
