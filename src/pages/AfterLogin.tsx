import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FriendProfile from "./Profile/FriendProfile";
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
import { useNavigate } from "react-router-dom";

function AfterLogin({ userId }) {
  const { state } = useLocation();
  const navigate = useNavigate();
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
          socket={socket}
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
          socket={socket}
        />
      );
      setModalOpen(true);
    };

    function onJoinGame(responseData: any) {
      console.log("JOIN_GAME");
      console.log(responseData);

      navigate("/Game", { state: { userId: id, roomId: responseData.roomId } });
    }

    socket.on("REQUEST_FRIEND", (data) => handleFriendRequest(data));
    socket.on("INVITE", (data) => handleGameRequest(data));

    // join game
    socket.on("JOIN_GAME", onJoinGame);
  }, [socket]);
  socket.on("NOTICE", (data) => console.log(data.code));
  return (
    <div>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/MyProfile" element={<Myprofile />} />
        <Route path="/FriendProfile/:id" element={<FriendProfile />} />
        <Route path="/Lobby" element={<Lobby id={id} />} />
        <Route path="/Loading" element={<Loading />} />
        <Route path="/Game" element={<Game />} />
        {/* <Route path="/Friends" element={<Friends />} /> */}
        <Route
          path="/Chatting"
          element={
            <Chatting
              socket={null}
              id={userId}
              pageStart="0"
              name="pjang"
              avatar="https://cdn.intra.42.fr/users/436a0681d2090c6c2673a67cb9b129e6/pjang.jpg"
            />
          }
        />
        <Route path="/Ranking" element={<Ranking />} />
      </Routes>
      {modalOpen && modalContent}
    </div>
  );
}

export default AfterLogin;
