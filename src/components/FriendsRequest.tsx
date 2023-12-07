import { useState } from "react";
import styles from "./FriendsRequest.module.css";
import axios from "axios";

interface List {
  name: string;
}

function FriendsRequest(props: any) {
  const [listOpen, setListOpen] = useState(false);
  const [listInfo, setListInfo] = useState<List[]>([]);
  let RequestList: List[] = [];
  const handleInputChange = (e) => {
    setListOpen(!listOpen);
    console.log("Request : ", listOpen);
    if (!listOpen) {
      getList();
      console.log(listInfo);
    }
  };
  const getList = () => {
    axios
      .get(`http://localhost:3000/users/friend-requests-recv/2`)
      .then((Response) => {
        for (let i = 0; i < Response.data.length; ++i) {
          {
            Response.data[i] &&
              RequestList.push({
                name: Response.data[i].send.name,
              });
          }
        }
        setListInfo(RequestList);
      });
  };
  const handleDeleteRequest = (index) => {
    setListInfo((prevList) => {
      // 함수형 업데이트를 사용하여 목록을 간단하게 업데이트합니다.
      const updatedList = [...prevList];
      updatedList.splice(index, 1);
      // props.socket.emit();
      return updatedList;
    });
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
              <button className={`${styles.ui_btn}`} key={index}>
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
    </div>
  );
}

export default FriendsRequest;
