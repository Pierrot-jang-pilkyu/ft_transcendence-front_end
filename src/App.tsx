import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Lobby from "./pages/Lobby/Lobby";
import Mode from "./pages/Mode/Mode";
import Myprofile from "./pages/Profile/Myprofile";
import Friendprofile from "./pages/Profile/FriendProfile";
import Game from "./pages/Game/Game";
import Friends from "./pages/Lobby/Menu/Friends/Friends";
import Chatting from './pages/Chatting/Chatting';
import Loading from "./pages/Loading/Loading";
import { useState, createContext } from "react";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';

import Ranking from "./pages/Ranking/Ranking";

export const IdContext = createContext();

// Cookie
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: string, options?: any) => {
 	return cookies.set(name, value, {...options}); 
}

export const getCookie = (name: string) => {
 return cookies.get(name); 
}

// Socket connet

let socket = io('http://localhost:3000');

//HERE
function App() {
	const [id, setId] = useState();

	const userId = getCookie("user.id");

  // 라우트 가드 함수
  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Anton&family=Noto+Sans:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Anton&display=swap"
        rel="stylesheet"
      />
      <IdContext.Provider value={[id, setId]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            {true && (
              <>
                <Route path="/MyProfile" element={<Myprofile />} />
                <Route path="/FriendProfile" element={<Friendprofile />} />
                <Route path="/Lobby" element={<Lobby id={userId}/>} />
                <Route path="/Loading" element={<Loading />} />
                <Route path="/Game" element={<Game />} />
                <Route path="/Friends" element={<Friends />} />
                <Route
                  path="/Chatting"
                  element={
                    <Chatting
                      socket={socket}
                      id={userId}
                      pageStart="0"
                      name="pjang"
                      avatar="https://cdn.intra.42.fr/users/436a0681d2090c6c2673a67cb9b129e6/pjang.jpg"
                    />
                  }
                />
                <Route path="/Ranking" element={<Ranking />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </IdContext.Provider>
    </div>
  );
}

export default App;
