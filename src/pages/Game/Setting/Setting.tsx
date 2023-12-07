import styles from "./Setting.module.css"
import { useContext, useEffect, useState } from "react";
import { GameContext, socket } from "../Utils";
import ChattingRoom from "../ChattingRoom/ChattingRoom";
import AnnounceBar from "../AnnounceBar/AnnounceBar";
import Mode from "./Mode/Mode";
import { useNavigate } from "react-router-dom";

function Setting()
{
    const [game, setGame] = useContext(GameContext);
    const [option, setOption] = useState({
        speed: 5,
        ballSize: 5,
        barSize: 5,
    });
    const [ready, setReady] = useState({left: false, right: false});
    const navigate = useNavigate();

    useEffect(()=> {
        socket.on("OPTION", (data)=>{
            setOption(data);
        })

        socket.on("READY", (data)=>{
            setReady({
                left:data.room.left.isReady,
                right:data.room.right.isReady
            });
        });

        socket.on("START", (data)=>{
            setGame(data);
        });

        socket.on("DODGE", ()=>{
            navigate("/Lobby");
        })
        
        return (()=>{
            socket.off("READY");
            socket.off("START");
            socket.off("OPTION");
        });
    }, [])

    return (
        <div>
            <Mode option={option} author={!game.room.rank && !ready && game.isLeft} ready={ready}/>
            <AnnounceBar/>
            <ChattingRoom isLeft={game.isLeft}/>
        </div>
    )
}

export default Setting;