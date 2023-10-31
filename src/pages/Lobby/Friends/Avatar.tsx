import styles from "./Avatar.module.css";
import ProfileImg from "../../../assets/img_Profile.png";


function Avatar(props:any) {
    return (
        <button className={`${styles.friend_container}`}>
            <div className="avatar online">
                <div className={`${styles.h_5} ${styles.rounded_full}`}>
                    <img src={ProfileImg} />
                </div>
            </div>
            <div className={styles.friend_font}>{props.name}</div>
        </button>
    );
  }
  
  export default Avatar;
