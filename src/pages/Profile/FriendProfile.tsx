import Header from "../../components/Header";
import ProfileCard from "./profileCard/PofileCard";
import MatchHistory from "./Match History/MatchHistory";
import styles from "./Profile.module.css";
import { useParams } from "react-router-dom";
import socket from "../../hooks/socket/socket";
import { useContext, useEffect } from "react";
import { IdContext } from "../../App";

function Friendprofile(props: any) {
  const [userId, setUserId] = useContext(IdContext);
  const { id } = useParams();
  useEffect(() => {
    socket.connect();

    socket.emit("REGIST", parseInt(userId));

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className={`${styles.background}`}>
      <Header />
      <div className={`${styles.Allcontainer}`}>
        <ProfileCard id={id} />
        <MatchHistory id={id} />
      </div>
    </div>
  );
}

export default Friendprofile;
