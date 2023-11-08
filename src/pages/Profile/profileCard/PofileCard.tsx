import styles from "./ProfileCard.module.css";
import editprofile from "./Edit Profile.png";
import crown from "./crown.png";

function ProfileCard(props: any) {
  return (
    <div className={`${styles.profile}`}>
      <div className={`${styles.profiletitle}`}>Profile</div>
      <div className={`${styles.profilebackground}`}>
        <div className={`${styles.photo}`} />
        <div>
          <img src={editprofile} alt="" className={styles.edit} />
        </div>
        <div className={`${styles.profilename}`}>jaeywon{props.name}</div>
        <div className={`${styles.rankpage}`}>
          <img src={crown} className={styles.crown} />
          <text className={`${styles.rank}`}>Rank:</text>
          <div className={`${styles.rankvalue}`}>1{props.rank}</div>
          <text className={`${styles.win}`}>Win:</text>
          <div className={`${styles.winvalue}`}>123{props.win}</div>
          <text className={`${styles.lose}`}>Lose:</text>
          <div className={`${styles.losevalue}`}>123{props.lose}</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
