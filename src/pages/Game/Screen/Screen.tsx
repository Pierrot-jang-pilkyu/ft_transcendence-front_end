import Setting from "./Setting/Setting"
import Canvas from "./Canvas/Canvas";
import styles from "./Screen.module.css"
import { useEffect, useState } from "react";
import socket from "../Socket";

function Screen(props)
{
    const [isReady, setReady] = useState(false);
    const [isStart, setStart] = useState(false)
    const [options, setOptions] = useState({
        speed: 5,
        barSize: 5,
        ballSize: 5,    
    });

    useEffect(()=>{
        socket.on("START", () => {
            setStart(true);
        });
        if (isReady == true)
            socket.emit("READY", props.gameInfo);
    }, [isReady])

    return (
        <div className={`${styles.container}`}>
            {!isReady && <Setting setOptions={setOptions} setReady={setReady}/>}
            {isStart && <Canvas options={options} isLeft={props.gameInfo.isLeft} roomId={props.gameInfo.roomId}/>}
        </div>
    )
}

export default Screen;