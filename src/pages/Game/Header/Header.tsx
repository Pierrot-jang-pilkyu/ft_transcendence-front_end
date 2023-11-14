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
		<header className={`${styles.header}`}>
				<button className={`${styles.home} ${styles.button}`} onClick={handlerButton}>Deer Feer</button>
				<button className={`${styles.logout} ${styles.button}`} onClick={handlerButtonLogOut}>Logout</button>
		</header>
	);
}

export default Header;
