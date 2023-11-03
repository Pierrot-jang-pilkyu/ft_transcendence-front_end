import styles from "./Avatar.module.css";
import ProfileImg from "../../../assets/img_Profile.png";


function Avatar(props:any) {

    const avatarState = () => {
        const res = [];
        
        if (props.state === "online")
            res.push(<div className={`${styles.avatar_online}`}><img className={`${styles.avatar}`} src={props.img} /></div>);
        if (props.state === "offline")
            res.push(<div className={`${styles.avatar_offline}`}><img className={`${styles.avatar}`} src={props.img} /></div>);
        if (props.state === "playing")
            res.push(<div className={`${styles.avatar_playing}`}><img className={`${styles.avatar}`} src={props.img} /></div>);
        
        return res;
    };

    return (
        <button className={`${styles.friend_container}`}>
            {/* <div className={`${styles.avatar_online}`}>
                <img className={`${styles.avatar}`} src={props.img} />
            </div> */}
            {avatarState()}
            <div className={styles.friend_font}>{props.name}</div>
        </button>
    );
  }
  
  export default Avatar;
