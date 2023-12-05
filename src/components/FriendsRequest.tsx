import { useState } from "react";
import styles from "./FriendsRequest.module.css";

function FriendsRequest() {
  const [listOpen, setListOpen] = useState(false);
  const handleInputChange = (e) => {
    setListOpen(!listOpen);
    console.log(listOpen);
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
        <div className={`${styles.friendrlist}`}>
          <ul></ul>
        </div>
      )}
    </div>
  );
}

export default FriendsRequest;
