import styles from "./RankTable.module.css";
import RankList from "./RankList";
import { useEffect, useState } from "react";

function RankTable(props: any) {
  const [ranks, setRanks] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/games/ranks", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setRanks(data));
  }, []);
  const rankerTable1 = () => {
    const res = [];
    if (ranks == undefined) return res;
    for (let i = 0; i < 16; ++i) {
      if (ranks[i] == undefined)
        res.push(
          <RankList rank={i + 1} nickname={null} win={null} lose={null} />
        );
      else {
        const win: string = ranks[i].win;
        const lose: string = ranks[i].loss;
        const score: string = "Point: " + ranks[i].score;
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