import styles from "./Option.module.css"

function Option(props)
{
    function onLeft() {
        if (props.value > 1)
            props.setValue(props.value - 1);
    }

    function onRight() {
        if (props.value < 9)
            props.setValue(props.value + 1);
    }

    return (
        <div className={`${styles.container}`}>
            <div>{props.name}:</div>
            <div className={`${styles.select}`}>
                <button className={`${styles.button}`} onClick={onLeft}>&#60;</button>
                <div>{props.value}</div>
                <button className={`${styles.button}`} onClick={onRight}>&#62;</button> 
            </div>
        </div>
    )

}

export default Option;