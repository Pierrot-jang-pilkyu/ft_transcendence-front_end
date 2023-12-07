import { useContext, useEffect, useState } from "react";
import { GameContext, GameModalContext, socket } from "../Utils";
import BorderButton from "../../../components/BorderButton/BorderButton";
import { useNavigate } from "react-router-dom";
import GameModal from "../GameModal/GameModal";
import styles from "./RankMatch.module.css"

function RankMatch()
{

    const [game, setGame] = useContext(GameContext);
    const [gameModal, setGameModal] = useContext(GameModalContext);
    const navigate = useNavigate();


    function clickMatch() {
        socket.emit("MATCH");
        setGameModal({
            open: true, 
            content: 
                (<GameModal
                    title={"매칭 중"}
                    content={""}
                    leftButton={{title:"창닫기", onClick:()=>{setGameModal({open:false})}}}
                    rightButton={{title:"...", onClick:null}}
                />)
        })
    }

    useEffect(()=>{
        socket.on("LOAD", (data) => {
            setGame(data);
            setGameModal({open:close});
        });

        return (()=>{
            socket.off("LOAD");
            socket.off("WAIT");
        })
    }, [])
    return (
        <div className={`${styles.container}`}>
             <div className={`${styles.title}`}>RATE: {"1489P"}</div>
            <BorderButton title={"MATCH START"} onClick={()=>{clickMatch()}}/>
            <BorderButton title={"BACK TO LOBBY"} onClick={()=>{navigate("/Lobby")}}/>
        </div>
    );
}

export default RankMatch;