import styles from "./ProfileCard.module.css";
import editprofile from "./Edit Profile.png";
import crown from "./crown.png";
import { useState, useEffect } from "react";

function ProfileCard(props: any) {
  const [profile, setProfile] = useState();

  useEffect(() => {
    const id = props.id;
    console.log(props.id);
    fetch(`http://localhost:3000/users/players/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((error) => {
        console.log("FAILED");
      });
  }, [profile]);

  return (
    <div className={`${styles.profile}`}>
      <div className={`${styles.profiletitle}`}>Profile</div>
      <div className={`${styles.profilebackground}`}>
        <img
          className={`${styles.photo}`}
          src={profile == undefined ? null : profile.avatar}
        />
        <div>
          <img src={editprofile} alt="" className={styles.edit} />
        </div>
        <div className={`${styles.profilename}`}>
          {profile == undefined ? null : profile.name}
        </div>
        <div className={`${styles.rankpage}`}>
          <img src={crown} className={styles.crown} />
          <text className={`${styles.rank}`}>Rank:</text>
          <div className={`${styles.rankvalue}`}>
            {profile == undefined
              ? null
              : profile.gameRecord == null
              ? "--"
              : profile.gameRecord.rank}
          </div>
          <text className={`${styles.win}`}>Win:</text>
          <div className={`${styles.winvalue}`}>
            {profile == undefined
              ? null
              : profile.gameRecord == null
              ? 0
              : profile.gameRecord.win}
          </div>
          <text className={`${styles.lose}`}>Lose:</text>
          <div className={`${styles.losevalue}`}>
            {profile == undefined
              ? null
              : profile.gameRecord == null
              ? 0
              : profile.gameRecord.lose}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
