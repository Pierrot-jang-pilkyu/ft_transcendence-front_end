import styles from "./ChattingRoom.module.css"
import Input from "./Input/Input"
import Log from "./Log/Log"
import { useEffect, useState } from "react";


function ChattingRoom(props)
{
    return (
        <div className={`${styles.container}`}>
            <Log></Log>
            <Input></Input>
        </div>
    )
}

export default ChattingRoom;