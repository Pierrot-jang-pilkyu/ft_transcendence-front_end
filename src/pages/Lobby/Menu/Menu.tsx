import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Menu.module.css";
import Avatar from "../Friends/Avatar";
import GameStart from "../../../assets/GameStart.svg";
import ChattingRoom from "../../../assets/Chatting.svg";
import SearchFriends from "../../../assets/SearchFriends.svg";
import FriendsArrow from "../../../assets/FriendsArrow.svg";
import FriendsAdd from "../../../assets/FriendsAdd.svg";

function Menu(props: any) {
  const [nick, setNick] = useState("");
  const avatars: any = [];

  // const avatars = () =>  {
  // 	const res:any = [];
  // 	return res;
  // };

  const changeAvatar = () => {
    for (let i = 0; i < props.friendObjects.length; ++i) {
      avatars.push(
        <li>
          <Avatar
            name={props.friendObjects[i].name}
            img={props.friendObjects[i].img}
            state={props.friendObjects[i].state}
          />
        </li>
      );
      // console.log('name: ' + props.friendObjects[i].name + ', img_src: ' + props.friendObjects[i].img);
    }
  };

  const addFriendList = (nickName: any, img: any, state: any) => {
    avatars.push(
      <li>
        <Avatar name={nickName} img={img} state={state} />
      </li>
    );
  };

  const onChange = (e: any) => {
    setNick(e.target.value);
    // test();
  };

  const onAddButton = () => {
    setNick("");
    if (nick === "") {
      alert("warning");
      return "";
    }
    // 백엔드
  };

  const navigate = useNavigate();

  const handlerButton = () => {
    // navigate('/Mode')
    navigate("/Game");
  };

  const handlerButtonChatting = () => {
    navigate("/Chatting");
  };

  return (
    <div className={`${styles.buttons}`}>
      <button
        className={`${styles.button} ${styles.game}`}
        onClick={handlerButton}
      >
        <img className={styles.gamestart_img} src={GameStart}></img>
        <div className={`${styles.game_font}`}>Start Game!</div>
      </button>
      <button
        className={`${styles.button} ${styles.chat}`}
        onClick={handlerButtonChatting}
      >
        <img src={ChattingRoom} />
        <div className={`${styles.chat_font}`}>Chatting Room</div>
      </button>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className={`${styles.button} ${styles.friend} ${styles.friend_font}`}
          >
            <img src={SearchFriends}></img>
            <div className={`${styles.friend_font}`}>Search Friends</div>
            <img src={FriendsArrow}></img>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className={styles.fl_background}>
            <div className={styles.friend_list}>
              <ul className="menu p-4 w-80 min-h-full bg-gray-200 text-base-content">
                {/* Sidebar content here */}
                {/* <li><Avatar name="James Dinn" /></li> */}
                {changeAvatar()}
                {avatars}
              </ul>
            </div>
            <div className={`${styles.input_container}`}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search…"
                  className={`${styles.input}`}
                  value={nick}
                  onChange={onChange}
                />
                <img
                  className={styles.add_container}
                  src={FriendsAdd}
                  onClick={onAddButton}
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
