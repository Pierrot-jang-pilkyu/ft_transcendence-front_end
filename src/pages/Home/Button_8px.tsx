import { useNavigate } from "react-router-dom";
import styles from "./Button_8px.module.css";
import { useState, useRef } from "react";

function Button(props: any) {
  const navigate = useNavigate();

  const handlerButton = () => {
    navigate("/Loading");
  };
  const [data, setData] = useState();

  const url =
    "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-1fd0b93bafae96b52681b16549e5fffd8534a21d46e29b155e7de51e78d0648a&redirect_uri=http%3A%2F%2Flocalhost%3A5173&response_type=code";
  return (
    // <button className={`${styles.button}`} onClick={handlerButton}>
    //   {props.name}
    // </button>
    <a href={url} className={styles.button}>
      {props.name}
    </a>
  );
}

export default Button;
