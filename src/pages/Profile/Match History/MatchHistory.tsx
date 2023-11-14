import styles from "./MatchHistory.module.css";
import HistoryTable from "./Table";

function MatchHistory() {
  return (
    <div className={`${styles.Historycontainer}`}>
      <div className={`${styles.Historytitle}`}>Match History</div>
      <HistoryTable/>
    </div>
  );
}

export default MatchHistory;
