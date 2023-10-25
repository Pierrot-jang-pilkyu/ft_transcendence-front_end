import styles from "./Header.module.css";

function Header() 
{
	return (
		<header className={`${styles.header}`}>
				<button className={`${styles.home} ${styles.button}`}>D or Feer P__ong</button>
				<button className={`${styles.logout} ${styles.button}`}>Logout</button>
		</header>
	);
}

export default Header;
