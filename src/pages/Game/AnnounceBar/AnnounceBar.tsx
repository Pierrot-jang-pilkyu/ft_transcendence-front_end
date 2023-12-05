import { useEffect, useState } from "react";
import { socket } from "../Utils";
import styles from "./AnnounceBar.module.css"

function AnnounceBar() 
{
    const [content, setContent] = useState("");
    const [tid, setTid] = useState<any>(null);

    useEffect(()=>{
        socket.on("ANNOUNCE", (data)=>{
            setContent(data);
        });

        return (()=>{
            socket.off("ANNOUNCE");
        }
        );
    }, []);

    useEffect(()=>{
        if (!content)
            return ;
        
        if (tid)
        {
            clearTimeout(tid);
            setTid(null);
        }
        let tmp = setTimeout(()=>{setContent("");}, 3000);
        setTid(tmp);
    }, [content]);

    return (
        <div className={`${styles.container}`}>
            {content}
            {/* {"game will be start in 20s..."} */}
        </div>
    );
}

export default AnnounceBar;