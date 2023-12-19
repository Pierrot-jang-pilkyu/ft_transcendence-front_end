import { useEffect, useState } from "react";
import { socket } from "../Utils";
import styles from "./AnnounceBar.module.css"

function AnnounceBar() 
{
    const [content, setContent] = useState("");

    useEffect(()=>{
        socket.on("ANNOUNCE", (data)=>{
            setContent(data);
        });

        return (()=>{
            socket.off("ANNOUNCE");
        }
        );
    }, []);

    return (
        <div className={`${styles.container}`}>
            {content}
            {/* {"game will be start in 20s..."} */}
        </div>
    );
}

export default AnnounceBar;
