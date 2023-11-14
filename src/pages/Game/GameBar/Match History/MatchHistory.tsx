import styles from "./MatchHistory.module.css";
import Table from "./Table";

function MatchHistory(props) {
  return (
    <div className={`${styles.container}`}>
      <div className={props.leftflag ? styles.left : styles.right}>Nick Name</div>
      <Table/>
    </div>
  );
}

export default MatchHistory;
