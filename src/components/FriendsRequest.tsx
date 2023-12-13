import { useState, useEffect } from "react";
import styles from "./FriendsRequest.module.css";
import axios from "axios";
import Scoket_Lobby from "../hooks/socket/socket";
import Socket_Chat from "../pages/Chatting/Socket";
import Modal from "../components/FriendsRequestModal";
interface List {
  name: string;
  avatar: string;
}

function FriendsRequest(props: any) {
  const [listOpen, setListOpen] = useState(false);
  const [listInfo, setListInfo] = useState<List[]>([]);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );
  const [modalData, setModalData] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  let RequestList: List[] = [];
  let selectedSocket: any;

  const handleInputChange = (e: any) => {
    setListOpen(!listOpen);
    if (props.pageFlag === 1) {
      selectedSocket = Scoket_Lobby;
    } else if (props.pageFlag === 2) {
      selectedSocket = Socket_Chat;
    }
    if (!listOpen) {
      selectedSocket.emit("GET_FRIEND_REQUEST");
      selectedSocket.on("GET_FRIEND_REQUEST", (data: any) =>
        handleFriendsList(data)
      );
      console.log(listInfo);
    } else {
      selectedSocket.off("GET_FRIEND_REQUEST");
    }
  };

  const handleFriendsList = (data: any) => {
    setModalData(data);
    for (let i = 0; i < data.length; ++i) {
      {
        data[i] &&
          RequestList.push({
            name: data[i].send.name,
            avatar: data[i].send.avatar,
          });
      }
    }
    setListInfo(RequestList);
  };
  const handleDeleteRequest = (index: any) => {
    setListInfo((prevList) => {
      const updatedList = [...prevList];
      updatedList.splice(index, 1);
      return updatedList;
    });
  };

  const handleBtnList = (index: any) => {
    setModalContent(<Modal data={listInfo} socket={selectedSocket} />);
    setModalOpen(true);
  };
  return (
    <div className={`${styles.container}`}>
      <label className={`${styles.bar}`} htmlFor="check">
        <input type="checkbox" id="check" onChange={handleInputChange} />
        <span className={`${styles.top}`}></span>
        <span className={`${styles.middle}`}></span>
        <span className={`${styles.bottom}`}></span>
      </label>
      {listOpen && (
        <div
          className={`${styles.friendrlist}`}
          style={{ overflowY: "scroll", overflowX: "hidden" }}
        >
          {listInfo.map((item, index) => (
            <div className={`${styles.listcontainer}`}>
              <button
                className={`${styles.ui_btn}`}
                key={index}
                onClick={handleBtnList}
              >
                <span>{item.name}님이 친구가 되길 원합니다!</span>
              </button>
              <button
                className={`${styles.bin}`}
                onClick={() => handleDeleteRequest(index)}
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      )}
      {modalOpen && modalContent}
    </div>
  );
}

export default FriendsRequest;
