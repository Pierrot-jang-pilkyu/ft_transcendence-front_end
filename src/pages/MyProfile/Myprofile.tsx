import Header from "../../components/Header";
import ProfileCard from "./profileCard/PofileCard";
import MatchHistory from "./Match History/MatchHistory";
import styles from "./Myprofile.module.css"

function Myprofile(props:any) {
    return (
        <div className={`${styles.background}`}>
            <Header />
            {/* <div className={`${styles.Allcontainer}`}> */}
                <ProfileCard />
                <MatchHistory />
            {/* </div> */}
        </div>
    );
}

export default Myprofile;