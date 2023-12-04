import styles from "./Setting.module.css"
import Option from "./Option/Option";
import { useContext, useEffect, useState } from "react";
import { GameContext, Status, socket } from "../Utils";
import ChattingRoom from "../ChattingRoom/ChattingRoom";
import AnnounceBar from "../AnnounceBar/AnnounceBar";

function Setting()
{
    const [speed, setSpeed] = useState(5);
    const [ballSize, setBallSize] = useState(5);
    const [barSize, setBarSize] = useState(5);
    const [ready, setReady] = useState({left: false, right: false});
    const [game, setGame] = useContext(GameContext);

    function clickReady()
    {
        socket.emit("READY", game);
    }

    useEffect(()=> {
        socket.on("OPTION", (data)=>{
            //
        })
        socket.on("READY", (data)=>{
            setReady({
                left:data.room.left.isReady,
                right:data.room.right.isReady
            });
        });

        socket.on("START", (data)=>{
            console.log(data);
            setGame(data);
        });
        
        return (()=>{
            socket.off("READY");
            socket.off("START");
            socket.off("OPTION");
        });
    }, [])

    useEffect(()=>{
        socket.emit("OPTION", { speed: speed, ballSize: ballSize, barSize: barSize });
    }, [speed, ballSize, barSize])

    return (
        <div>
            <div className={`${styles.container}`}>
                <div className={`${styles.title}`}>Mode Setting</div>
                <div className={`${styles.options}`}>
                    <Option name="Speed" value={speed} setValue={setSpeed} clickable={!game.room.rank && !ready && game.isLeft}/>
                    <Option name="Ball Size" value={ballSize} setValue={setBallSize} clickable={!game.room.rank && !ready && game.isLeft}/>
                    <Option name="Bar Size" value={barSize} setValue={setBarSize} clickable={!game.room.rank && !ready && game.isLeft}/>
                </div>
                <button className={`${styles.button}`} onClick={clickReady}>Ready</button>
                <div className={`${styles.readyBar}`}>
                    <div className={`${ (ready.left) ? styles.ready : styles.unready}`}>READY!</div>
                    <div className={`${ (ready.right) ? styles.ready : styles.unready}`}>READY!</div>
                </div>
            </div>
            <AnnounceBar/>
            <ChattingRoom isLeft={game.isLeft}/>
        </div>
    )
}

export default Setting;