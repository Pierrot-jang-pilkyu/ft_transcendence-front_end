import { useEffect, useState } from "react";
import styles from "./Log.module.css"
import { isOnlyBlank } from "../../Utils";

function Log({logs, left, right})
{ 
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.nameBar}`}>
                <div>{left}(#154)</div>
                <div>{right}(#321)</div>
            </div>
            <div className={`${styles.logs}`}>
                {logs.slice(0).reverse().map(log=>(
                    !isOnlyBlank(log.content) && <div className={`${styles.chatBox} ${log.isUser ? styles.user : styles.opposite} ${log.isLeft ? styles.left : styles.right}`}>{log.content}</div>
                ))}
            </div>
        </div>
    )
}

export default Log;
