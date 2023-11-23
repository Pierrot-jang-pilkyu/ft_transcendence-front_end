import styles from "./Avatar.module.css";
import ProfileImg from "../../../assets/img_Profile.png";


function Avatar(props:any) {

    const avatarState = () => {
        const res = [];
        
        if (props.state == "1")
            res.push(<div className={`${styles.avatar_online}`}><img className={`${styles.avatar}`} src={props.img} /></div>);
        if (props.state == "2")
            res.push(<div className={`${styles.avatar_offline}`}><img className={`${styles.avatar}`} src={props.img} /></div>);
        if (props.state == "3")
            res.push(<div className={`${styles.avatar_playing}`}><img className={`${styles.avatar}`} src={props.img} /></div>);
        
        return res;
    };

    return (
        <div className={`${styles.friend_container}`}>
            { props.op && <img className={styles.op_crown} src="./src/assets/Chat_Avatar_crown.png" /> }
            {avatarState()}
        </div>
    );
  }
  
  export default Avatar;
