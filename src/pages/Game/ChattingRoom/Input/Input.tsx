import styles from "./Input.module.css"
import ChattingInputButton from "../../../../assets/ChattingInputButton.svg"

function Input()
{
    return (
        <div className={`${styles.container}`}>
            <input type="text" className={`${styles.input}`}></input>
            <button className={`${styles.button}`}>
                <img src={ChattingInputButton}></img>
            </button>
        </div>
    );
}

export default Input;