import Header from "../../components/Header";
import ProfileCard from "./profileCard/PofileCard";
import MatchHistory from "./Match History/MatchHistory";
import styles from "./Profile.module.css"

function Friendprofile(props:any) {
	return (
		<div className={`${styles.background}`}>
			<Header />
			<ProfileCard />
			<MatchHistory />
		</div>
	);
}

export default Friendprofile;
