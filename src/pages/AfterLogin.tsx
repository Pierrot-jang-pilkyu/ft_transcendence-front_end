import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Friendprofile from "./Profile/FriendProfile";
import Myprofile from "./Profile/Myprofile";
import Lobby from "./Lobby/Lobby";
import Chatting from "./Chatting/Chatting";
import Mode from "./Mode/Mode";
import Ranking from "./Ranking/Ranking";
import Friends from "./Lobby/Menu/Friends/Friends";
import Game from "./Game/Game";
import Loading from "./Loading";
import { useState } from "react";
import { useContext } from "react";
import { IdContext } from "../App";
import { useLocation } from "react-router-dom";
import socket from "../hooks/socket/socket";
import ModalAccept from "../components/AddAndAccept";

function AfterLogin({ userId }) {
  const { state } = useLocation();
  const [id, setId] = useContext(IdContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );
  useEffect(() => {
    if (state) {
      socket.emit("REGIST", parseInt(state));
    }
  }, [state]);
  useEffect(() => {
    const handleFriendRequest = (data) => {
      // data.avatar를 사용하여 원하는 동작 수행
      setModalContent(
        <ModalAccept
          type={"REQUEST_FRIEND"}
          data={data}
          onClose={() => setModalOpen(false)}
        />
      );
      setModalOpen(true);
    };
    const handleGameRequest = (data) => {
      // data.avatar를 사용하여 원하는 동작 수행
      setModalContent(
        <ModalAccept
          type={"INVITE"}
          data={data}
          onClose={() => setModalOpen(false)}
        />
      );
    };
    socket.on("REQUEST_FRIEND", (data) => handleFriendRequest(data));
    socket.on("INVITE", (data) => handleGameRequest(data));
  }, [socket]);
  socket.on("NOTICE", (data) => console.log(data.code));
  return (
    <div>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/MyProfile" element={<Myprofile />} />
        {/* <Route path="/FriendProfile" element={<Friendprofile />} /> */}
        <Route path="/Lobby" element={<Lobby id={id} />} />
        <Route path="/Loading" element={<Loading />} />
        {/* <Route path="/Game" element={<Game />} /> */}
        {/* <Route path="/Friends" element={<Friends />} /> */}
        {/* <Route
        path="/Chatting"
        element={
          <Chattings
            socket={null}
            id={userId}
            pageStart="0"
            name="pjang"
            avatar="https://cdn.intra.42.fr/users/436a0681d2090c6c2673a67cb9b129e6/pjang.jpg"
          />
        } */}
        {/* /> */}
        <Route path="/Ranking" element={<Ranking />} />
      </Routes>
      {modalOpen && modalContent}
    </div>
  );
}

export default AfterLogin;
