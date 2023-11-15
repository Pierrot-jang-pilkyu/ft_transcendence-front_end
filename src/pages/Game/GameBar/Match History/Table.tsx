import styles from "./Table.module.css";
import List from "./List";

function Table()
{
    return (
        <div className={`${styles.background}`}>
                <List
                    winflag={true}
                    matchtime={"2023.10.12  12:29:21"}
                    name={"nickname"}
                />
                <List
                    winflag={false}
                    matchtime={"2023.10.12  12:29:21"}
                    name={"nickname"}
                />
        </div>
    )
}

export default Table;