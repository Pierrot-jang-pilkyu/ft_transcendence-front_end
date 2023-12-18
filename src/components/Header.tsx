import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import FriendsRequest from "./FriendsRequest";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../App";
import axios from "axios";

function Header(props: any) {
  const [login, setLogin] = useContext(LoginContext);
  const [pageFlag, setPageFlag] = useState<undefined | Number>();
  const navigate = useNavigate();
  const handlerButton = () => {
    navigate("/Lobby");
  };
  const handlerButtonLogOut = () => {
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3000/auth/logout")
      .then((response) => {
        setLogin(false);
        navigate("/");
      })
      .catch((error) => {
        if (error.response.data.message === "Unauthorized") {
          axios.get("http://localhost:3000/auth/refresh/login");
        }
        console.log(error);
      });
  };
  useEffect(() => {
    if (props.pageFlag === 2) setPageFlag(2);
    else setPageFlag(1);
  }, []);
  return (
    <header className={`${styles.header}`}>
      <button
        className={`${styles.home} ${styles.button}`}
        onClick={handlerButton}
      >
        Deer Feer
      </button>
      <div className={`${styles.list}`}>
        <FriendsRequest pageFlag={pageFlag} />
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
