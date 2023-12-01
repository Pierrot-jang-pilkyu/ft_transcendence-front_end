import styles from "./Setting.module.css"
import Option from "./Option/Option";
import { useContext, useEffect, useState } from "react";
import { GameContext, Status, socket } from "../Utils";
import { IdContext } from "../../../App";

function Setting()
{
    const [speed, setSpeed] = useState(5);
    const [ballSize, setBallSize] = useState(5);
    const [barSize, setBarSize] = useState(5);
    const [ready, setReady] = useState(false);
    const [game, setGame] = useContext(GameContext);

    function clickReady()
    {
        if (ready == true)
            setReady(false);
        else
            setReady(true);
        socket.emit("READY", game);
    }

    function onVisiblityChange() {
        if (document.visibilityState == 'hidden' && ready == true)
            clickReady();
    }

    useEffect(()=> {
        document.addEventListener("visibilitychange", onVisiblityChange);
        socket.on("OPTION", (data)=>{
            //
        })
        socket.on("READY", (data)=>{
            console.log("ready:", data);
        });

        socket.on("START", (data)=>{
            console.log(data);
            setGame(data);
        });
        
        return (()=>{
            document.removeEventListener("visibilitychange", onVisiblityChange);
            socket.off("READY");
        });
    }, [])

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.title}`}>Mode Setting</div>
            <div className={`${styles.options}`}>
                <Option name="Speed" value={speed} setValue={setSpeed} clickable={!game.room.rank && !ready && game.isLeft}/>
                <Option name="Ball Size" value={ballSize} setValue={setBallSize} clickable={!game.room.rank && !ready && game.isLeft}/>
                <Option name="Bar Size" value={barSize} setValue={setBarSize} clickable={!game.room.rank && !ready && game.isLeft}/>
            </div>
            <button className={`${styles.button}`} onClick={clickReady}>Ready</button>
        </div>
    )
}

export default Setting;