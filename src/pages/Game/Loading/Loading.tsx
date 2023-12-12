import { useContext, useEffect, useState } from "react";
import { GameContext, socket} from "../Utils";
import { useNavigate } from "react-router-dom";
import styles from "./Loading.module.css";
import BorderButton from "../../../components/BorderButton/BorderButton";
import LoadingAnimation from "../../../components/LoadingAnimation/LoadingAnimation";

function Loading({gameRequest}) {
    const [wait, setWait] = useState(false);
    const [game, setGame] = useContext(GameContext);
    const navigate = useNavigate();

    function clickCancel()
    {
        socket.emit("CANCEL");
        navigate("/Lobby");
    }

    useEffect(() => {
        socket.on("LOAD", (data) => {
            setGame(data);
        });
        socket.on("WAIT", () => { setWait(true) });

        return (()=>{
            socket.off("LOAD");
            socket.off("RELOAD");
            socket.off("WAIT");
        })
    }, [])

    return (
        <div className={`${styles.container}`}>
            <LoadingAnimation/>
            {wait && <BorderButton title="cancel" onClick={clickCancel}/>}
        </div>
    );
}

export default Loading;