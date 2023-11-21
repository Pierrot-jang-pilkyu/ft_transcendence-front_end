import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Lobby from "./pages/Lobby/Lobby";
import Mode from "./pages/Mode/Mode";
import Myprofile from "./pages/Profile/Myprofile";
import Friendprofile from "./pages/Profile/FriendProfile";
import Game from "./pages/Game/Game";
import Friends from "./pages/Lobby/Menu/Friends/Friends";
import Chatting from './pages/Chatting/Chatting';
import { useState, createContext, useEffect } from "react";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import io from 'socket.io-client';

import Ranking from "./pages/Ranking/Ranking";

export const IdContext = createContext();
export const IsOpenExcludeGame = createContext();

// Cookie
import { Cookies } from 'react-cookie';
import ModalPortals from "./hooks/Modal/modal";
import AddAndAccept from "./components/AddAndAccept";

const cookies = new Cookies();

export const setCookie = (name: string, value: string, options?: any) => {
 	return cookies.set(name, value, {...options}); 
}

export const getCookie = (name: string) => {
 return cookies.get(name); 
}

// Socket connet

// let socket = io('http://localhost:3000');

//HERE
function App() {
	const [id, setId] = useState();
  const [IsOpen, setIsOpen] = useState(false);
  //modal props설정부분
  // const [ModalProps, setModalProps] = useState(); //프롭스 설정해주는 부분이 추가되어야함.
  // const [IsModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   socket.on('friendsinvite', () => {
  //     // friendsinvite 이벤트가 발생할 때 subject를 동적으로 추가하여 상태를 변경
  //     setModalProps((prevOptions) => ({
  //       ...prevOptions,
  //       subject: '친추초대',
  //       accept: '친구 수락하기',
  //     }));
  //   });

  //   socket.on('gameinvite', () => {
  //     // gameinvite 이벤트가 발생할 때 subject를 동적으로 추가하여 상태를 변경
  //     setModalProps((prevOptions) => ({
  //       ...prevOptions,
  //       subject: '게임초대',
  //       accept: '게임 수락하기',
  //     }));
  //   });
  //   setIsModalOpen(true);
  // }, [socket]);
  
  // const handleModal = () => {
  //   setIsModalOpen(false);
  // }
  //modal부분 끝
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
                <IsOpenExcludeGame.Provider value={[IsOpen, setIsOpen]}>

                <Route path="/MyProfile" element={<Myprofile />} />
                <Route path="/FriendProfile" element={<Friendprofile />} />
                <Route path="/Lobby" element={<Lobby id={userId}/>} />
                <Route path="/Mode" element={<Mode />} />
                <Route path="/Friends" element={<Friends />} />
                <Route path="/Game" element={<Game />} />
                <Route
                  path="/Chatting"
                  element={
                    <Chatting
                    // socket={socket}
                    id={userId}
                    pageStart="0"
                    name="pjang"
                    avatar="https://cdn.intra.42.fr/users/436a0681d2090c6c2673a67cb9b129e6/pjang.jpg"
                    />
                  }
                  />
                <Route path="/Ranking" element={<Ranking />} />
                {/* <ModalPortals>
                  {IsOpen && (IsModalOpen && <AddAndAccept options={ModalProps} onClose={handleModal}/>)}
                </ModalPortals> */}
                </IsOpenExcludeGame.Provider>
              </>
            )}
          </Routes>
        </BrowserRouter>
      </IdContext.Provider>
    </div>
  );
}
// }

export default App;
