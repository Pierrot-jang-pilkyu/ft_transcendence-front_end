import { useNavigate } from 'react-router-dom';
import styles from "./Header.module.css";

function Header() 
{
	const navigate = useNavigate();

	const handlerButton = () => {
		navigate('/Lobby')
	};

	const handlerButtonLogOut = () => {
		navigate('/')
	};

	return (
		<header className={`${styles.background}`}>
			<div className={`${styles.container}`}>
				<button className={`${styles.home} ${styles.button}`} onClick={handlerButton}>Deer Feer</button>
				<button className={`${styles.logout} ${styles.button}`} onClick={handlerButtonLogOut}>Logout</button>
			</div>
		</header>
	);
}

export default Header;
