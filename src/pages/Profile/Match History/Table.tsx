import styles from "./Table.module.css";
import List from "./List";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { IdContext } from "../../../App";

interface History {
  winflag: boolean;
  matchtime: string;
  name: string;
}

function HistoryTable(props: any) {
  const [id, setId] = useContext(IdContext);
  const [history, setHistory] = useState<History[]>([]);
  let HistoryList: History[] = [];
  useEffect(() => {
    axios.get(`http://localhost:3000/games/historys/${id}`).then((Response) => {
      console.log("Here:", Response.data);
      for (let i = 0; i < Response.data.length; ++i) {
        {
          Response.data[i] &&
            HistoryList.push({
              winflag: Response.data[i].result,
              matchtime: Response.data[i].date,
              name: Response.data[i].opponent.name,
            });
        }
      }
      setHistory(HistoryList);
    });
  }, []);

  return (
    <div className={`${styles.background}`}>
      <div style={{ overflowY: "scroll", overflowX: "hidden" }}>
        <ul>
          {history.map((item, index) => (
            <List
              key={index}
              winflag={item.winflag}
              matchtime={item.matchtime}
              name={item.name}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HistoryTable;
