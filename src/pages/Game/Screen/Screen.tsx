import Setting from "./Setting/Setting"
import Canvas from "./Canvas/Canvas";
import styles from "./Screen.module.css"
import { useState } from "react";

function Screen(props)
{
    const [isReady, setReady] = useState(false);
    const [options, setOptions] = useState({
        speed: 5,
        barSize: 5,
        ballSize: 5,    
    });

    return (
        <div className={`${styles.container}`}>
            {!isReady && <Setting setOptions={setOptions} setReady={setReady}/>}
            {isReady && <Canvas options={options} userId={props.userId}/>} 
        </div>
    )
}

export default Screen;