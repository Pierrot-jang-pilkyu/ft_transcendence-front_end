import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Mode from './pages/Mode/Mode';
import Myprofile from './pages/Profile/Myprofile';
import Friendprofile from './pages/Profile/FriendProfile';


function App() {
  return (
	<div>
		<link rel="preconnect" href="https://fonts.googleapis.com"/>
		<link rel="preconnect" href="https://fonts.gstatic.com" />
		<link href="https://fonts.googleapis.com/css2?family=Anton&family=Noto+Sans:wght@400;500;700&display=swap" rel="stylesheet"/>
		<link rel="preconnect" href="https://fonts.googleapis.com"/>
		<link rel="preconnect" href="https://fonts.gstatic.com" />
		<link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet"/>
		<BrowserRouter>
			<Routes>
				<Route index element={<Home />} />
				<Route path='/MyProfile' element={<Myprofile />} />
				<Route path='/FriendProfile' element={<Friendprofile />} />
				<Route path='/Mode' element={<Mode />} />
			</Routes>
		</BrowserRouter>
    </div>
  );
}

export default App;
