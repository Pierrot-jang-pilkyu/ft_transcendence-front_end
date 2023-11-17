import styles from "./List.module.css";

function List(props: any) {
  return (
    <div className={`${styles.container}`}>
      <div className={props.winflag ? styles.win : styles.lose}>
        {props.winflag ? "Win" : "Lose"}
      </div>
      <div className={`${styles.matchtext}`}>to</div>
      <div className={`${styles.name}`}>{props.name}</div>
    </div>
  );
}

export default List;
