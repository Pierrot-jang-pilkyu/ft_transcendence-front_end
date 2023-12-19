import { useState, useEffect } from "react";
import axios from "axios";

function Tmp() {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get("http://"+import.meta.env.VITE_BACKEND+"/games/ranks")
      .then((Response) => {
        setData(Response.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);
  console.log(data);

  return <div />;
}

export default Tmp;
