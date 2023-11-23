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

interface FriendProps {
  name: string;
  img: string;
  state: string;
}

function Lobby(props: any) {
  console.log(window.location.href);
  const { state } = useLocation();
  const [id, setId] = useContext(IdContext);

  // props.socket.emit("REGIST", props.id);
  // console.log(IsOpen);

  // useEffect(() => {
  //   setIsOpen(true);
  // }, []);
  // useEffect(() => {
  //   const handleFriendRequest = (data) => {
  //     // data.avatar를 사용하여 원하는 동작 수행
  //     setModalProps((prevOptions) => ({
  //       ...prevOptions,
  //       subject: "친추초대",
  //       accept: "친구 수락하기",
  //       avatar: data.send.avatar,
  //       name: data.send.name,
  //     }));
  //     console.log(IsModalOpen);
  //     setIsModalOpen(true);
  //     console.log("hhhhhhhhhhhhhhh", data.avatar);
  //   };

  //   const handleGameInvite = (data) => {
  //     setModalProps((prevOptions) => ({
  //       ...prevOptions,
  //       subject: "게임초대",
  //       accept: "게임 수락하기",
  //       avatar: data.send.avatar,
  //       name: data.send.name,
  //     }));
  //     setIsModalOpen(true);
  //   };

  //   if (IsOpen) {
  //     socket.on("NOTICE", (data) => console.log(data));
  //     socket.on("REQUEST_FRIEND", handleFriendRequest);
  //     socket.on("gameinvite", (data) => handleGameInvite(data));
  //   }
  // }, [socket, IsOpen]);

  // 다음 렌더링에서의 값이 출력됩니다.
  // console.log(IsOpen);
  const Objects: FriendProps[] = [
    {
      name: "pjang",
      img: "https://cdn.intra.42.fr/users/436a0681d2090c6c2673a67cb9b129e6/pjang.jpg",
      state: "online",
    },
    { name: "sehjang", img: "src/assets/react.svg", state: "playing" },
  ];
  return (
    <div className={`${styles.background}`}>
      {/* <img className={`${styles.img}`} src={HomeBall}/> */}
      <Header />
      <Profile id={props.id} />
      <div className={`${styles.ranking_container}`}>
        <Ranking />
      </div>
      <div className={`${styles.menu_container}`}>
        <Menu friendObjects={Objects} id={props.id} socket={props.socket} />
      </div>
    </div>
  );
}

export default Lobby;
