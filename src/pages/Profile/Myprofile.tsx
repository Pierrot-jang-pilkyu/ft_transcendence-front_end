import Header from "../../components/Header";
import ProfileCard from "./profileCard/PofileCard";
import MatchHistory from "./Match History/MatchHistory";
import styles from "./profile.module.css";
import { useContext } from "react";
import { IdContext } from "../../App";

function Myprofile(props: any) {
  const [id, setId] = useContext(IdContext);
  return (
    <div className={`${styles.background}`}>
      <Header />
      <div className={`${styles.Allcontainer}`}>
        <ProfileCard id={id} />
        <MatchHistory />
      </div>
    </div>
  );
}

export default Myprofile;
