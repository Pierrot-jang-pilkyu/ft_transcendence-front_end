import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
0
function Loading()
{
    const navigate = useNavigate();
    const [userId, setUserId] = useState();
    

    function onChangeId(e)
    {
        setUserId(e.target.value);
    } 

    function enter() {
        navigate("/Game", {state: userId});
    }

    return (
        <div>
            userId: <input id="channel" type="text" onChange={onChangeId}/>
            <button onClick={enter}>enter room</button>
        </div>
    );
}

export default Loading;