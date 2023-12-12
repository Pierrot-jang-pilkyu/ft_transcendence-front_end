import styles from "./ranking.module.css";
import ProfileCard from "../Profile/profileCard/PofileCard";
import Header from "../../components/Header";
import RankTable from "./RankTable/RankTable";
import { useNavigate } from "react-router-dom";
import { IdContext } from "../../App";
import { useContext, useEffect } from "react";
import socket from "../../hooks/socket/socket";

function Ranking(props: any) {
  const [id, setId] = useContext(IdContext);
  useEffect(() => {
    socket.connect();

    socket.emit("REGIST", parseInt(id));

    return () => {
      socket.disconnect();
    };
  }, []);

  const navigate = useNavigate();

  const handlerButton = () => {
    navigate("/MyProfile");
  };

  return (
    <div className={`${styles.background}`}>
      <Header />
      <div className={`${styles.Allcontainer}`}>
        <ProfileCard id={id} />
        <RankTable />
      </div>
      <div className={`${styles.buttonone}`} onClick={handlerButton}>
        Match History
      </div>
    </div>
  );
}

export default Ranking;