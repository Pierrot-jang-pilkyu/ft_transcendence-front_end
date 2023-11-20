import styles from "./ChattingRoom.module.css"
import Input from "./Input/Input"
import Log from "./Log/Log"
import { useEffect, useState } from "react";


function ChattingRoom(props)
{
    // useEffect(() => {
    //     socket.emit('JOIN', { userId: props.userId, channelId: 100005 });
    //     socket.on('MSG', async function (data) {
    //         console.log(await data);
    //     })
    // }, [])

    return (
        <div className={`${styles.container}`}>
            <Log></Log>
            <Input></Input>
        </div>
    )
}

export default ChattingRoom;