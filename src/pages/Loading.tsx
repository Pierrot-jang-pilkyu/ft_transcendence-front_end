import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IdContext } from "../App";

function Loading() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [id,setId] = useContext(IdContext);

  function onChangeId(e) {
    setUserId(e.target.value);
    console.log(e.target.value);
  }

  function enter() {
    setId(userId);
    navigate("/Lobby", { state: userId });
  }

  return (
    <div>
      userId: <input id="channel" type="text" onChange={onChangeId} />
      <button onClick={enter}>enter room</button>
    </div>
  );
}

export default Loading;
