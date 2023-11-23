import styles from "./Setting.module.css"
import Option from "./Option/Option";
import { useEffect, useState } from "react";
import { Status, socket } from "../Utils";

function Setting({setRoom, setStatus})
{
    const [speed, setSpeed] = useState(5);
    const [ballSize, setBallSize] = useState(5);
    const [barSize, setBarSize] = useState(5);
    const [ready, setReady] = useState(false);

    function onReadyClick()
    {
        if (ready == true)
            setReady(false);
        else
            setReady(true);
        socket.emit("READY");
    }

    function onVisiblityChange() {
        if (document.visibilityState == 'hidden' && ready == true)
            socket.emit("READY");
    }

    useEffect(()=> {
        document.addEventListener("visibilitychange", onVisiblityChange);
        socket.on("READY", ()=>{
            console.log("상대방 준비완료");    
        });

        socket.on("START", ()=>{
            //setGame();
            setStatus(Status.Gaming);
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
                <Option name="Speed" value={speed} setValue={setSpeed}/>
                <Option name="Ball Size" value={ballSize} setValue={setBallSize}/>
                <Option name="Bar Size" value={barSize} setValue={setBarSize}/>
            </div>
            <button className={`${styles.button}`} onClick={onReadyClick}>Ready</button>
        </div>
    )
}

export default Setting;