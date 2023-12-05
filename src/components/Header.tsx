import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import FriendsRequest from "./FriendsRequest";
import { useState } from "react";

function Header() {
  const navigate = useNavigate();
  const handlerButton = () => {
    navigate("/Lobby");
  };
  const handlerButtonLogOut = () => {
    navigate("/");
  };

  return (
    <header className={`${styles.header}`}>
      <button
        className={`${styles.home} ${styles.button}`}
        onClick={handlerButton}
      >
        Deer Feer
      </button>
      <div className={`${styles.list}`}>
        <FriendsRequest />
      </div>
      <button
        className={`${styles.logout} ${styles.button}`}
        onClick={handlerButtonLogOut}
      >
        Logout
      </button>
    </header>
  );
}

export default Header;
