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
  // const [id, setId] = useContext(IdContext);
  const [history, setHistory] = useState<History[]>([]);
  let HistoryList: History[] = [];
  useEffect(() => {
    console.log(props.id);
    let url;
    if (props.id === null) {
      url = `http://localhost:3000/games/historys/me`;
      console.log(url);
    } else {
      url = `http://localhost:3000/games/historys/${props.id}`;
    }
    console.log(url);
    axios
      .get(url)
      .then((Response) => {
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
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.message === "Unauthorized") {
          axios.get("http://localhost:3000/auth/refresh/2fa");
        }
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
