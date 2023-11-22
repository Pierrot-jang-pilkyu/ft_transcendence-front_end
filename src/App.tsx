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
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Ranking from "./pages/Ranking/Ranking";

export const IdContext = createContext();
export const IsOpenExcludeGame = createContext();
export const IsModal = createContext();

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

interface ModalProps {
  subject?: string;
  accept?: string;
  avatar?: string;
  name?: string;
}

//HERE
function App() {
  const [id, setId] = useState();
  const [IsOpen, setIsOpen] = useState(false);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  
  const userId = getCookie("user.id");

  const handleModal = () => {
    setIsModalOpen(false);
    console.log("test");
  }
  //modal부분 끝
  
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
        <IsOpenExcludeGame.Provider value={[IsOpen, setIsOpen]}>
            <IsModal.Provider value={[IsModalOpen, setIsModalOpen]}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  {true && (
                    <>
                      <Route path="/MyProfile" element={<Myprofile />} />
                      <Route path="/FriendProfile" element={<Friendprofile />} />
                      <Route path="/Lobby" element={<Lobby id={userId} socket={socket}/>} />
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
                    </>
                  )}
                </Routes>
              </BrowserRouter>
            <ModalPortals>
              {IsModalOpen && <AddAndAccept options={ModalProps} onClose={handleModal}/>}
            </ModalPortals>
          </IsModal.Provider>
        </IsOpenExcludeGame.Provider>
      </IdContext.Provider>
    </div>
  );
}
// }

export default App;
