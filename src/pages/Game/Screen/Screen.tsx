import Setting from "./Setting/Setting"
import Canvas from "./Canvas/Canvas";
import styles from "./Screen.module.css"
import { useState } from "react";

function Screen()
{
    const [isReady, setReady] = useState(false);
    const [options, setOptions] = useState({
        speed: 0,
        barSize: 0,
        ballSize: 0,    
    });

    return (
        <div className={`${styles.container}`}>
            {!isReady && <Setting setOptions={setOptions} setReady={setReady}/>}
            {isReady && <Canvas options={options}/>}     
        </div>
    )
}

export default Screen;