import React from "react";
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

function AfterLogin() {
  const [id, setId] = useContext(IdContext);
  console.log(id);
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Loading />} />
        <Route path="/MyProfile" element={<Myprofile />} />
        <Route path="/FriendProfile" element={<Friendprofile />} />
        <Route path="/Lobby" element={<Lobby id={id} />} />
        <Route path="/Loading" element={<Loading />} />
        <Route path="/Game" element={<Game />} />
        <Route path="/Friends" element={<Friends />} />
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
    </BrowserRouter>
  );
}

export default AfterLogin;
