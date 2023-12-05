import styles from "./ChattingRoom.module.css"
import Input from "./Input/Input"
import Log from "./Log/Log"
import { useContext, useEffect, useState } from "react";
import { GameContext, socket } from "../Utils";


function ChattingRoom({isLeft})
{
    const [game, setGame] = useContext(GameContext);
    const [input, setInput] = useState();
    const [logs, setLogs] = useState([]);
 
    useEffect(()=>{
        socket.on("MSG", (data)=>{
            setLogs(prev => [
                ...prev,
                { content: data, isUser: false, isLeft: !isLeft}
            ]);
        })
    }, []);

    useEffect(()=>{
        setLogs(prev => [
            ...prev,
            { content: input, isUser: true, isLeft: isLeft}
        ]);
    }, [input]);

    return (
        <div className={`${styles.container}`}>
            <Log logs={logs} left={game.room.left.player.name} right={game.room.right.player.name}></Log>
            <Input setInput={setInput}></Input>
        </div>
    )
}

export default ChattingRoom;