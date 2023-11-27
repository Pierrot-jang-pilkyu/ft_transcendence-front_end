import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Profile.module.css";
import ProfileImg from "../../../assets/img_Profile.png";
import Crown from "../../../assets/Lobby_crown.png";
import { IdContext } from "../../../App";
import { Cookies } from "react-cookie";
// import React from 'react';

function Profile() {
  const navigate = useNavigate();
  // const cookies = new Cookies();
  const { state } = useLocation();
  const handlerButton = () => {
    navigate("/MyProfile");
  };

  const [profile, setProfile] = useState();
  const [id, setId] = useContext(IdContext);

  useEffect(() => {
    if (id == undefined) setId(parseInt(state));
    fetch(`http://localhost:3000/users/players/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setProfile(data));
  }, [profile]);

  return (
    <div className={`${styles.profile_container}`}>
      {/* <div className={`${styles.profile_img}`}></div> */}
      <img
        className={`${styles.profile_img}`}
        src={profile == undefined ? null : profile.avatar}
      />
      <div className={`${styles.profile_second}`}>
        <div className={`${styles.profile_name}`}>
          {profile == undefined ? null : profile.name}
        </div>
        <div className={`${styles.profile_win}`}>Win:</div>
        <div className={`${styles.profile_win_value}`}>
          {profile == undefined
            ? null
            : profile.gameRecord == null
            ? 0
            : profile.gameRecord.win}
        </div>
        <div className={`${styles.profile_lose}`}>Lose:</div>
        <div className={`${styles.profile_lose_value}`}>
          {profile == undefined
            ? null
            : profile.gameRecord == null
            ? 0
            : profile.gameRecord.lose}
        </div>
      </div>
      <div className={`${styles.profile_line}`}></div>
      <img className={`${styles.profile_crown}`} src={Crown} />
      <div className={`${styles.profile_rank}`}>Rank:</div>
      <div className={`${styles.profile_rank_value}`}>
        {profile == undefined
          ? null
          : profile.gameRecord == null
          ? "--"
          : profile.gameRecord.rank}
      </div>
      <button className={styles.button} onClick={handlerButton}></button>
    </div>
  );
}

export default Profile;
