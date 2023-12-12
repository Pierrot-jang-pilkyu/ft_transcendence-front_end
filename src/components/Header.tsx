import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import FriendsRequest from "./FriendsRequest";
import { useEffect, useState } from "react";

function Header(props: any) {
  const [pageFlag, setPageFlag] = useState<undefined | Number>();
  const navigate = useNavigate();
  const handlerButton = () => {
    navigate("/Lobby");
  };
  const handlerButtonLogOut = () => {
    navigate("/");
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
