import { useEffect, useState } from "react";
import styles from "./Timer.module.css"

function Timer({min, sec, action}:
    {min:number, sec:number, action:any})
{
    const [count, setCount] = useState((min * 60 + sec))
    const minute = Math.floor(count / 60);
    const second = count % 60

    useEffect(()=>{
        const id = setTimeout(()=>{
                setCount(pre => pre - 1)
        }, 1000)
        if (count == 0)
        {
            clearTimeout(id);
            action();
        }
        
        return (()=>{
            clearTimeout(id);
        })
    }, [count])
    return (
        <div className={`${styles.container}`}>
            {minute < 10 ? `0${minute}` : minute}:{second < 10 ? `0${second}` : second}
        </div>
    );
}

export default Timer;