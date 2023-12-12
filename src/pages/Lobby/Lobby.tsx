import Header from "../../components/Header";
import styles from "./Lobby.module.css";
import Profile from "./Profile/Profile";
import Ranking from "./Ranking/Ranking";
import Menu from "./Menu/Menu";
import { useContext, useEffect, useState } from "react";
import { IdContext } from "../../App";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";
// import Friends from "./Friends/Frends"
// import HomeBall from "../../assets/HomeBall.png";
import socket from "../../hooks/socket/socket";

interface FriendProps {
  name: string;
  img: string;
  state: string;
}

function Lobby(props: any) {
  const { state } = useLocation();
  const [id, setId] = useContext(IdContext);

  useEffect(() => {
    console.log(state);
    socket.connect();
    socket.emit("REGIST", parseInt(state));

    return () => {
      socket.disconnect();
    };
  }, []);

  const Objects: FriendProps[] = [
    {
      name: "pjang",
      img: "https://cdn.intra.42.fr/users/436a0681d2090c6c2673a67cb9b129e6/pjang.jpg",
      state: "online",
    },
    { name: "sehjang", img: "src/assets/react.svg", state: "playing" },
  ];
  // socket.on("REQUEST_FRIEND", (data) => console.log("I GOTTTTTT"));
  return (
    <div className={`${styles.background}`}>
      {/* <img className={`${styles.img}`} src={HomeBall}/> */}
      <Header pageFlag={1} />
      <Profile id={id} />
      <div className={`${styles.ranking_container}`}>
        <Ranking />
      </div>
      <div className={`${styles.menu_container}`}>
        <Menu friendObjects={Objects} id={id} socket={props.socket} />
      </div>
    </div>
  );
}

export default Lobby;
