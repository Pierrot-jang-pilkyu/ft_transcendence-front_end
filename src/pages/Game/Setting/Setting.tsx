import styles from "./Setting.module.css"
import { useContext, useEffect, useState } from "react";
import { GameContext, GameModalContext, socket } from "../Utils";
import ChattingRoom from "../ChattingRoom/ChattingRoom";
import AnnounceBar from "../AnnounceBar/AnnounceBar";
import Mode from "./Mode/Mode";
import { useNavigate } from "react-router-dom";
import GameModal from "../GameModal/GameModal";

function Setting()
{
    const [game, setGame] = useContext(GameContext);
    const [gameModal, setGameModal] = useContext(GameModalContext);
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
            setGameModal({
                open: true,
                content: 
                (<GameModal
                    title={"상대방 닷지"}
                    content={""}
                    leftButton={{title:"창닫기", onClick:()=>{
                        setGameModal({open:false});
                        navigate("/Lobby");
                    }}}
                    rightButton={{title:"...", onClick: null}}
                />)
            });
        })
        
        return (()=>{
            socket.off("READY");
            socket.off("START");
            socket.off("OPTION");
        });
    }, [])

    return (
        <div>
            <Mode option={option} author={!game.room.rank && game.isLeft && !ready.left} ready={ready}/>
            <AnnounceBar/>
            <ChattingRoom isLeft={game.isLeft}/>
        </div>
    )
}

export default Setting;