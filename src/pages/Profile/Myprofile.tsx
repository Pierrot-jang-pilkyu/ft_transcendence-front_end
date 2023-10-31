import Header from "../../components/Header";
import ProfileCard from "./profileCard/PofileCard";
import MatchHistory from "./Match History/MatchHistory";
import styles from "./profile.module.css"

function Myprofile(props:any) {
    return (
        <div className={`${styles.background}`}>
            <Header />
            <ProfileCard />
	        <MatchHistory />
        </div>
    );
}

export default Myprofile;
