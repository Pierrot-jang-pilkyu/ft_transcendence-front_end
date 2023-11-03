import styles from "./ranking.module.css";
import Profile from "../Profile/profileCard/PofileCard";
import Header from "../../components/Header";
import RankTable from "./rankTable/rankTable";
import { useNavigate } from "react-router-dom";

function Ranking(props: any) {
  const navigate = useNavigate();

  const handlerButton = () => {
    navigate("/MyProfile");
  };

  return (
    <div className={`${styles.background}`}>
      <Header />
      <div className={`${styles.Allcontainer}`}>
        <Profile />
        <RankTable />
      </div>
      <div className={`${styles.buttonone}`} onClick={handlerButton}>
        Match History
      </div>
    </div>
  );
}

export default Ranking;
