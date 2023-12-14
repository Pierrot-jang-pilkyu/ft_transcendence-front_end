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
import { useNavigate, useLocation } from "react-router-dom";
import socket from "../hooks/socket/socket";
import ModalAccept from "../components/AddAndAccept";

function AfterLogin() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );

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
          invite: {
            roomId: responseData.roomId,
            gameRequest: responseData.gameRequest,
          },
        },
      });
    }

    socket.on("REQUEST_FRIEND", (data) => handleFriendRequest(data));
    socket.on("INVITE", (data) => handleGameRequest(data));

    // join game
    socket.on("JOIN_GAME", onJoinGame);
  }, [socket]);
  return (
    <div>
      <Routes>
        <Route path="/Lobby" element={<Lobby />} />
        <Route path="/MyProfile" element={<Myprofile />} />
        <Route path="/FriendProfile/:id" element={<FriendProfile />} />
        <Route path="/Game" element={<Game />} />
        {/* <Route path="/Friends" element={<Friends />} /> */}
        <Route
          path="/Chatting"
          element={
            <Chatting
              socket={null}
              id={null}
              pageStart="0"
              name="pjang"
              avatar="https://cdn.intra.42.fr/users/436a0681d2090c6c2673a67cb9b129e6/pjang.jpg"
            />
          }
        />
        <Route path="/Ranking" element={<Ranking />} />
        <Route path="*" element={<Lobby />} />
      </Routes>
      {modalOpen && modalContent}
    </div>
  );
}

export default AfterLogin;
