import styles from "./MatchHistory.module.css"
import HistoryList from "./HistoryList"

function MatchHistory() {
    return (
        <div className={`${styles.Historycontainer}`}>
            <div className={`${styles.Historytitle}`}>Match History</div>
            <div className={`${styles.Historybackground}`}>
                    {/*밑에 부분에 백과 협의후 작성해야한다.*/}
                    <HistoryList winflag={true} matchtime={'2023.10.12  12:29:21'} name={'nickname'}/>
                    <HistoryList winflag={false} matchtime={'2023.10.12  12:29:21'} name={'nickname'}/>
                    <HistoryList winflag={true} matchtime={'2023.10.12  12:29:21'} name={'nickname'}/>
                    <HistoryList winflag={true} matchtime={'2023.10.12  12:29:21'} name={'nickname'}/>
                    <HistoryList winflag={true} matchtime={'2023.10.12  12:29:21'} name={'nickname'}/>
                    <HistoryList winflag={false} matchtime={'2023.10.12  12:29:21'} name={'nickname'}/>
                    <HistoryList winflag={true} matchtime={'2023.10.12  12:29:21'} name={'nickname'}/>
                    <HistoryList winflag={true} matchtime={'2023.10.12  12:29:21'} name={'nickname'}/>
                    <HistoryList winflag={true} matchtime={'2023.10.12  12:29:21'} name={'nickname'}/>
                    <HistoryList winflag={true} matchtime={'2023.10.12  12:29:21'} name={'nickname'}/>
                    <HistoryList winflag={false} matchtime={'2023.10.12  12:29:21'} name={'nickname'}/>
                    <HistoryList winflag={false} matchtime={'2023.10.12  12:29:21'} name={'nickname'}/>
                    <HistoryList winflag={true} matchtime={'2023.10.12  12:29:21'} name={'nickname'}/>
                    <HistoryList winflag={false} matchtime={'2023.10.12  12:29:21'} name={'nickname'}/>
                    <HistoryList winflag={true} matchtime={'2023.10.12  12:29:21'} name={'nickname'}/>
                    <HistoryList winflag={true} matchtime={'2023.10.12  12:29:21'} name={'nickname'}/> 
            </div>
        </div>
    );
}

export default MatchHistory;
