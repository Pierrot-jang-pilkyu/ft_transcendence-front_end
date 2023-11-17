import styles from "./Setting.module.css"
import Option from "./Option/Option";
import { useState } from "react";

function Setting(props)
{
    const [speed, setSpeed] = useState(5);
    const [ballSize, setBallSize] = useState(5);
    const [barSize, setBarSize] = useState(5);

    function onReady()
    {
        props.setOptions({
            speed: speed,
            ballSize: ballSize,
            barSize: barSize,
        });
        props.setReady(true);
    }

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.title}`}>Mode Setting</div>
            <div className={`${styles.opt_container}`}>
                <Option name="Speed" value={speed} setValue={setSpeed}/>
                <Option name="Ball Size" value={ballSize} setValue={setBallSize}/>
                <Option name="Bar Size" value={barSize} setValue={setBarSize}/>
            </div>
            <button className={`${styles.button}`} onClick={onReady}>Ready</button>
        </div>
    )
}

export default Setting;