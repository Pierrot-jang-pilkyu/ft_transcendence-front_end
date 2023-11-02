import Header from "../../components/Header";
import ProfileCard from "./profileCard/PofileCard";
import MatchHistory from "./Match History/MatchHistory";
import styles from "./Profile.module.css";

function Friendprofile(props: any) {
  return (
    <div className={`${styles.background}`}>
      <Header />
      <div className={`${styles.Allcontainer}`}>
        <ProfileCard />
        <MatchHistory />
      </div>
      <div className={`${styles.buttonone}`}>DM</div>
      <div className={`${styles.buttontwo}`}>INVITE</div>
    </div>
  );
}

export default Friendprofile;
