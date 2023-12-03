import styles from "./Setting.module.css"
import Option from "./Option/Option";
import { useContext, useEffect, useState } from "react";
import { GameContext, Status, socket } from "../Utils";
import { IdContext } from "../../../App";
import ChattingRoom from "../ChattingRoom/ChattingRoom";
import AnnounceBar from "../AnnounceBar/AnnounceBar";

function Setting()
{
    const [speed, setSpeed] = useState(5);
    const [ballSize, setBallSize] = useState(5);
    const [barSize, setBarSize] = useState(5);
    const [ready, setReady] = useState({user:false, oppo:false});
    const [game, setGame] = useContext(GameContext);

    function clickReady()
    {
        setReady((prev) => {
            return {
                user: prev.user == true ? false : true,
                oppo: prev.oppo,
            };
        });
        socket.emit("READY", game);
    }

    useEffect(()=> {
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
            socket.off("READY");
            socket.off("START");
            socket.off("OPTION");
        });
    }, [])

    useEffect(()=>{
        socket.emit("OPTION", { speed: speed, ballSize: ballSize, barSize: barSize });
    }, [speed, ballSize, barSize])

    return (
        <>
            <div className={`${styles.container}`}>
                <div className={`${styles.title}`}>Mode Setting</div>
                <div className={`${styles.options}`}>
                    <Option name="Speed" value={speed} setValue={setSpeed} clickable={!game.room.rank && !ready && game.isLeft}/>
                    <Option name="Ball Size" value={ballSize} setValue={setBallSize} clickable={!game.room.rank && !ready && game.isLeft}/>
                    <Option name="Bar Size" value={barSize} setValue={setBarSize} clickable={!game.room.rank && !ready && game.isLeft}/>
                </div>
                <button className={`${styles.button}`} onClick={clickReady}>Ready</button>
                <div className={`${styles.readyBar}`}>
                    <div className={`${ (game.isLeft ? ready.user : ready.oppo) ? styles.ready : styles.unready}`}>READY!</div>
                    <div className={`${ (!game.isLeft ? ready.user : ready.oppo) ? styles.ready : styles.unready}`}>READY!</div>
                </div>
            </div>
            <AnnounceBar></AnnounceBar>
            <ChattingRoom isLeft={game.isLeft}/>
        </>
    )
}

export default Setting;