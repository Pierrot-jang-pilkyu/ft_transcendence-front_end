import { useContext, useEffect, useState } from "react";
import { GameContext, GameModalContext, socket } from "../Utils";
import BorderButton from "../../../components/BorderButton/BorderButton";
import { useNavigate } from "react-router-dom";
import GameModal from "../GameModal/GameModal";
import styles from "./RankMatch.module.css"
import Timer from "../Timer/Timer";
import LoadingAnimation from "../../../components/LoadingAnimation/LoadingAnimation";
import axios from "axios";
import {IdContext} from "../../../App";

function RankMatch()
{

    const [game, setGame] = useContext(GameContext);
    const [gameModal, setGameModal] = useContext(GameModalContext);
    const [rate, setRate] = useState(null);
    const navigate = useNavigate();

    function clickMatch() {
        socket.emit("MATCH");
        setGameModal({
            open: true, 
            content:
                (<GameModal
                    title={"매치 메이킹중"}
                    content={<LoadingAnimation/>}
                    leftButton={{title:"취소", onClick:()=>{
                        socket.emit("CANCEL");
                        setGameModal({open:false})
                    }}}
                />)
        })
    }

    useEffect(()=>{
        axios.get(`http://localhost:3000/users/game-records/me`)
        .then(function (response) {
            setRate(response.data.rating);
        })

        socket.on("LOAD", (data) => {
            setGame(data);
            setGameModal({open:close});
        });

        socket.on("PENALTY", (data) => {
            setGameModal({
                open: true, 
                content:
                    (<GameModal
                        title={"닷지 패널티"}
                        content={<Timer min={1} sec={5} action={()=>{setGameModal({open:false})}}/>}
                        leftButton={{title:"창닫기", onClick:()=>{
                            setGameModal({open:false})
                        }}}
                    />)
            })
        })

        return (()=>{
            socket.off("LOAD");
            socket.off("PENALTY");
        })
    }, [])
    return (
        <div className={`${styles.container}`}>
             <div className={`${styles.title}`}>RATE: {rate}p</div>
            <BorderButton title={"MATCH START"} onClick={()=>{clickMatch()}}/>
            <BorderButton title={"BACK TO LOBBY"} onClick={()=>{navigate("/Lobby")}}/>
        </div>
    );
}

export default RankMatch;
