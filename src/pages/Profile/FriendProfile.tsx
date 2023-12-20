import Header from "../../components/Header";
import ProfileCard from "./profileCard/PofileCard";
import MatchHistory from "./Match History/MatchHistory";
import styles from "./Profile.module.css";
import { useParams } from "react-router-dom";
import socket from "../../hooks/socket/socket";
import { useContext, useEffect } from "react";

function Friendprofile(props: any) {
  const { id } = useParams();
  useEffect(() => {
    socket.io.opts = {
      autoConnect: false,
      hostname: import.meta.env.VITE_HOSTNAME,
      path: "/socket.io",
      port: import.meta.env.VITE_PORT,
      query: {status: 2},
      secure: false,
      withCredentials: true,
    }
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className={`${styles.background}`}>
      <Header pageFlag={1} />
      <div className={`${styles.Allcontainer}`}>
        <ProfileCard id={id} />
        <MatchHistory id={id} />
      </div>
    </div>
  );
}

export default Friendprofile;
