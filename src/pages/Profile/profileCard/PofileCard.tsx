import styles from "./ProfileCard.module.css";
import editprofile from "./Edit Profile.png";
import crown from "./crown.png";
import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IdContext } from "../../../App";

function ProfileCard(props: any) {
  const [profile, setProfile] = useState();
  const [editFlag, setEditFlag] = useState(false);
  const { state } = useLocation();
  const [id, setId] = useContext(IdContext);
  useEffect(() => {
    if (props.flag === 1) {
      setEditFlag(true);
    } else {
      setEditFlag(false);
    }
  }, [props.flag]);

  useEffect(() => {
    console.log(id);
    setId(parseInt(state));
    fetch(`http://localhost:3000/users/players/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((error) => {
        console.log("FAILED");
      });
    console.log(id);
  }, [id]);

  return (
    <div className={`${styles.profile}`}>
      <div className={`${styles.profiletitle}`}>Profile</div>
      <div className={`${styles.profilebackground}`}>
        <img
          className={`${styles.photo}`}
          src={profile == undefined ? null : profile.avatar}
        />
        <div>
          <img
            className={styles.edit}
            src={editFlag ? editprofile : undefined}
            alt=""
            onClick={props.onOpenModal}
          />
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
