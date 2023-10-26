import styles from "./MyProfile.module.css"
import Header from "../../components/Header"

function Myprofile() {
    return (
        <div className={`${styles.background}`}>
            <Header />
            <div className={`${styles.profile}`}>
                <div className={`${styles.profiletitle}`}>My profile</div>
                <div className={`${styles.profilebackground}`}>
                    <div className={`${styles.photo}`}></div>
                </div>
            </div>
        </div>         
    )
}

export default Myprofile;