import styles from "./ranking.module.css";
import ProfileCard from "../Profile/profileCard/PofileCard";
import Header from "../../components/Header";
import RankTable from "./RankTable/RankTable";
import { useNavigate } from "react-router-dom";
import { IdContext } from "../../App";
import { useContext } from "react";

function Ranking(props: any) {
  const navigate = useNavigate();

  const handlerButton = () => {
    navigate("/MyProfile");
  };

  const [id, setId] = useContext(IdContext);
  return (
    <div className={`${styles.background}`}>
      <Header />
      <div className={`${styles.Allcontainer}`}>
        <ProfileCard id={id} />
        <RankTable />
      </div>
      <div className={`${styles.buttonone}`} onClick={handlerButton}>
        Match History
      </div>
    </div>
  );
}

export default Ranking;
