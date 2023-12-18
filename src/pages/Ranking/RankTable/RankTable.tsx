import styles from "./RankTable.module.css";
import RankList from "./RankList";
import { useEffect, useState } from "react";
import axios from "axios";

function RankTable(props: any) {
  const [ranks, setRanks] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3000/games/ranks")
      .then((res) => setRanks(res.data))
      .catch((error) => {
        if (error.response.data.message === "Unauthorized") {
          axios.get("http://localhost:3000/auth/refresh/2fa");
        }
      });
  }, []);
  const rankerTable1 = () => {
    const res = [];
    if (ranks == undefined) return res;
    for (let i = 0; i < 16; ++i) {
      if (ranks[i] == undefined)
        res.push(
          <RankList rank={null} nickname={null} win={null} lose={null} />
        );
      else {
        const win: string = ranks[i].win;
        const lose: string = ranks[i].loss;
        const score: string = "Point: " + ranks[i].rating;
        const id: number = ranks[i].user.id;
        res.push(
          <RankList
            rank={i + 1}
            nickname={ranks[i].user.name}
            win={win}
            lose={lose}
            score={score}
            id={id}
          />
        );
      }
    }
    return res;
  };

  return (
    <div className={`${styles.rankcontainer}`}>
      <div className={`${styles.ranktitle}`}>Rank</div>
      <div className={`${styles.rankbackground}`}>{rankerTable1()}</div>
    </div>
  );
}

export default RankTable;
