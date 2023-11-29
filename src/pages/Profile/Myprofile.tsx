import Header from "../../components/Header";
import ProfileCard from "./profileCard/PofileCard";
import MatchHistory from "./Match History/MatchHistory";
import styles from "./profile.module.css";
import { useContext, useState } from "react";
import { IdContext } from "../../App";
import ChangeModal from "./ChangeModal/ChangeModal";

function Myprofile(props: any) {
  const [nickModal, setNickModal] = useState(false);
  const [id, setId] = useContext(IdContext);

  const handleOpenChangeModal = () => {
    setNickModal(true);
  };
  const handleCloseChangeModal = () => {
    setNickModal(false);
  };
  return (
    <div className={`${styles.background}`}>
      <Header />
      <div className={`${styles.Allcontainer}`}>
        <ProfileCard id={id} onOpenModal={handleOpenChangeModal} flag={1} />
        <MatchHistory id={id} />
      </div>
      {nickModal && <ChangeModal id={id} onClose={handleCloseChangeModal} />}
    </div>
  );
}

export default Myprofile;
