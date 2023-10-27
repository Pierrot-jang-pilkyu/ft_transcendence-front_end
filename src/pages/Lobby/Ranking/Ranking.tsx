import { useNavigate } from 'react-router-dom';
import styles from "./Ranking.module.css";
import UserRanking from './UserRanking';
import Stroke from "../../../assets/Ranking_Vector(Stroke).png"

function Ranking(props:any) {

	const navigate = useNavigate();

	const handlerButton = () => {
		navigate('/Lobby')
	};

    const rankerTable1 = () => {
        const res = [];
        for (let i = 0; i < 5; ++i)
        {
            const win:string = "Win: " + props.user[i].win; 
            const lose:string = "Lose: " + props.user[i].lose;
            res.push(<UserRanking rank={props.user[i].rank} nickname={props.user[i].nickname} win={win} lose={lose} />);
        }
        return res;
    }

    const rankerTable2 = () => {
        const res = [];
        for (let i = 5; i < 10; ++i)
        {
            const win:string = "Win: " + props.user[i].win; 
            const lose:string = "Lose: " + props.user[i].lose;
            res.push(<UserRanking rank={props.user[i].rank} nickname={props.user[i].nickname} win={win} lose={lose} />);
        }
        return res;
    }

	return (
		<div className={`${styles.ranking_table}`}>
            <div className={`${styles.ranking_top10}`}>Ranking Top 10</div>
            <div className={`${styles.ranking_table_line}`}></div>
            <div className={`${styles.ranking_table_small}`}>
                {/* {rankerTable1} */}
                <UserRanking rank="1" nickname="first" win="Win: 12345" lose="Lose: 100" />
                <UserRanking rank="2" nickname="second" win="Win: 12340" lose="Lose: 110" />
                <UserRanking rank="3" nickname="third" win="Win: 12300" lose="Lose: 120" />
                <UserRanking rank="4" nickname="fourth" win="Win: 12000" lose="Lose: 130" />
                <UserRanking rank="5" nickname="fiveth" win="Win: 10000" lose="Lose: 140" />
            </div>
            <div className={`${styles.ranking_table_small_2}`}>
                {/* {rankerTable2} */}
                <UserRanking rank="6" nickname="sixth" win="Win: 1234" lose="Lose: 300" />
                <UserRanking rank="7" nickname="seventh" win="Win: 1230" lose="Lose: 310" />
                <UserRanking rank="8" nickname="eighth" win="Win: 1200" lose="Lose: 320" />
                <UserRanking rank="9" nickname="nineth" win="Win: 1000" lose="Lose: 330" />
                <UserRanking rank="10" nickname="tenth" win="Win: 900" lose="Lose: 340" />
            </div>
            <button className={styles.ranking_view_more} onClick={handlerButton}>
                {props.button}
                <img className={`${styles.ranking_view_more_img}`} src={Stroke} />
            </button>
        </div>
	);
}

export default Ranking;
