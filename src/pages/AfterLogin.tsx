import React, { useEffect, useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import FriendProfile from "./Profile/FriendProfile";
import Myprofile from "./Profile/Myprofile";
import Lobby from "./Lobby/Lobby";
import Chatting from "./Chatting/Chatting";
import Mode from "./Mode/Mode";
import Ranking from "./Ranking/Ranking";
import Friends from "./Lobby/Menu/Friends/Friends";
import Game from "./Game/Game";
import Loading from "./Loading";
import { IdContext, getCookie } from "../App";
import { useNavigate, useLocation } from "react-router-dom";
import socket from "../hooks/socket/socket";
import ModalAccept from "../components/AddAndAccept";
import axios from "axios";
import { useCookies } from "react-cookie";

function AfterLogin({ userId, token }) {
  const [cookies, setCookie, removeCookie] = useCookies(["TwoFactorAuth"]);
  const navigate = useNavigate();
  const [id, setId] = useContext(IdContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );
  console.log(token);
  console.log("test_id: ", userId);
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
      console.log(data);
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

      navigate("/Game", {
        state: {
          userId: userId,
          invite: {
            roomId: responseData.roomId,
            gameRequest: responseData.gameRequest,
          },
        },
      });
    }
    const handleNotice = (data) => {
      if (data.code == 202)
        axios.get("http://localhost:3000/auth/refresh").catch((error) => {
          navigate(
            "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-1fd0b93bafae96b52681b16549e5fffd8534a21d46e29b155e7de51e78d0648a&redirect_uri=http%3A%2F%2Flocalhost%3A5173&response_type=code"
          );
        });
    };
    socket.on("REQUEST_FRIEND", (data) => handleFriendRequest(data));
    socket.on("INVITE", (data) => handleGameRequest(data));
    socket.on("NOTICE", (data) => handleNotice(data));
    // join game
    socket.on("JOIN_GAME", onJoinGame);
  }, [socket]);
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
