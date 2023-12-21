import styles from "./ChattingRoom.module.css"
import Input from "./Input/Input"
import Log from "./Log/Log"
import { useContext, useEffect, useState } from "react";
import { GameContext, socket } from "../Utils";


function ChattingRoom({isLeft} : {isLeft:boolean})
{
    const [game, setGame] = useContext<any>(GameContext);
    const [input, setInput] = useState<any>();
    const [logs, setLogs] = useState<any>([]);

    useEffect(()=>{
        socket.on("MSG", (data)=>{
            setLogs( (prev:any) => [
                ...prev,
                { content: data, isUser: false, isLeft: !isLeft}
            ]);
        })
    }, []);

    useEffect(()=>{
        setLogs( (prev:any) => [
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
