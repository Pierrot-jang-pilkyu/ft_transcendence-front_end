import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Lobby from "./pages/Lobby/Lobby";
import Mode from "./pages/Mode/Mode";
import Myprofile from "./pages/Profile/Myprofile";
import Friendprofile from "./pages/Profile/FriendProfile";
import Game from "./pages/Game/Game";
import Friends from "./pages/Lobby/Friends/Friends";
import Ranking from "./pages/ranking/ranking";

function App() {
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
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/MyProfile" element={<Myprofile />} />
          <Route path="/FriendProfile" element={<Friendprofile />} />
          <Route path="/Lobby" element={<Lobby />} />
          <Route path="/Mode" element={<Mode />} />
          <Route path="/Game" element={<Game />} />
          <Route path="/Friends" element={<Friends />} />
          <Route path="/Ranking" element={<Ranking />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
