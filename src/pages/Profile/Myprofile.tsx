import Header from "../../components/Header";
import ProfileCard from "./profileCard/PofileCard";
import MatchHistory from "./Match History/MatchHistory";
import styles from "./profile.module.css";
import { useEffect, useContext, useState } from "react";
import { IdContext } from "../../App";
import ChangeModal from "./ChangeModal/ChangeModal";
import socket from "../../hooks/socket/socket";

function Myprofile(props: any) {
  const [nickModal, setNickModal] = useState(false);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleOpenChangeModal = () => {
    setNickModal(true);
  };
  const handleCloseChangeModal = () => {
    setNickModal(false);
  };

  return (
    <div className={`${styles.background}`}>
      <Header pageFlag={1} />
      <div className={`${styles.Allcontainer}`}>
        <ProfileCard onOpenModal={handleOpenChangeModal} flag={1} />
        <MatchHistory />
      </div>
      {nickModal && <ChangeModal onClose={handleCloseChangeModal} />}
    </div>
  );
}

export default Myprofile;
