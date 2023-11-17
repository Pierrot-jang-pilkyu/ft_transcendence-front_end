import Setting from "./Setting/Setting"
import Canvas from "./Canvas/Canvas";
import styles from "./Screen.module.css"
import { useState } from "react";

function Screen()
{
    const [isReady, setReady] = useState(false);
    const [options, setOptions] = useState({
        speed: 5,
        barSize: 5,
        ballSize: 5,    
    });
    <div className={`${styles.container}`}>
    {/* {!isReady && <Setting setOptions={setOptions} setReady={setReady}/>} */}
    {true && <Canvas options={options}/>} 
</div>
    return (
        <Canvas options={options}/>
    )
}

export default Screen;