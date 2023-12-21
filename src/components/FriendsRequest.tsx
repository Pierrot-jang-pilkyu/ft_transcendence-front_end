import { useState } from "react";
import styles from "./FriendsRequest.module.css";
import Scoket_Lobby from "../hooks/socket/socket";
import Socket_Chat from "../pages/Chatting/Socket";
interface List {
  name: string;
  avatar: string;
}

function FriendsRequest(props: any) {
  const [listOpen, setListOpen] = useState(false);
  const [listInfo, setListInfo] = useState<List[]>([]);
  const [listdata, setListdata] = useState();
  let RequestList: List[] = [];
  let selectedSocket: any;

  if (props.pageFlag === 1) {
    selectedSocket = Scoket_Lobby;
  } else if (props.pageFlag === 2) {
    selectedSocket = Socket_Chat;
  }

  const handleInputChange = (e: any) => {
    setListOpen(!listOpen);
    if (!listOpen) {
      selectedSocket.emit("GET_FRIEND_REQUEST");
      selectedSocket.on("GET_FRIEND_REQUEST", (data: any) =>
        handleFriendsList(data)
      );
    } else {
      selectedSocket.off("GET_FRIEND_REQUEST");
    }
  };

  const handleFriendsList = (data: any) => {
    RequestList = [];
    for (let i = 0; i < data.length; ++i) {
      {
        data[i] &&
          RequestList.push({
            name: data[i].send.name,
            avatar: data[i].send.avatar,
          });
      }
    }
    setListdata(data);
    setListInfo(RequestList);
  };

  const handleBtnList = (index: any) => {
    selectedSocket.emit("RECALL_FRIEND_REQUEST", listdata[index]);
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
          style={{ overflowY: "scroll", overflowX: "hidden" }}>
          {listInfo.map((item, index) => (
            <div className={`${styles.listcontainer}`}>
              <button
                className={`${styles.ui_btn}`}
                key={index}
                onClick={() => handleBtnList(index)}>
                <span>{item.name}님이 친구가 되길 원합니다!</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FriendsRequest;
