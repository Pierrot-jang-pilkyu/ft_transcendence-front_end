import { useContext, useEffect, useState } from "react";
import { GameContext, GameModalContext, socket } from "../Utils";
import BorderButton from "../../../components/BorderButton/BorderButton";
import { useNavigate } from "react-router-dom";
import GameModal from "../GameModal/GameModal";
import styles from "./RankMatch.module.css";
import Timer from "../Timer/Timer";
import LoadingAnimation from "../../../components/LoadingAnimation/LoadingAnimation";
import axios from "axios";
import { LoginContext } from "../../../App";

function RankMatch() {
  const [login, setLogin] = useContext(LoginContext);
  const [game, setGame] = useContext(GameContext);
  const [gameModal, setGameModal] = useContext(GameModalContext);
  const [rate, setRate] = useState(null);
  const navigate = useNavigate();

  function clickMatch() {
    socket.emit("MATCH");
  }

  useEffect(() => {
    axios
      .get("http://" + import.meta.env.VITE_BACKEND + "/users/game-records/me")
      .then(function (response) {
        setRate(response.data.rating);
      })
      .catch((error) => {
        if (error.response.data.message === "Unauthorized") {
          axios
            .get(
              "http://" + import.meta.env.VITE_BACKEND + "/auth/refresh/login"
            )
            .then(() => {
              axios
                .get(
                  "http://" +
                    import.meta.env.VITE_BACKEND +
                    "/users/game-records/me"
                )
                .then(function (response) {
                  setRate(response.data.rating);
                });
            })
            .catch(() => {
              setLogin(false);
            });
        }
      });
    
      socket.on("NOTICE", (data) => {
        console.log("notice");
        switch (data.code) {
          case 201:
            axios.defaults.withCredentials = true;
            axios.post("http://" + import.meta.env.VITE_BACKEND + "/auth/logout")
            .then(() => {setLogin(false)})
            .catch(() => {setLogin(false)})
            break;
          case 202:
            axios.get("http://" + import.meta.env.VITE_BACKEND + "/auth/refresh/2fa")
            .then(()=>{socket.emit("MATCH")})
            .catch(() => {setLogin(false)});
            break;
        }
      })

    socket.on("LOAD", (data) => {
      setGame(data);
      setGameModal({ open: close });
    });

    socket.on("PENALTY", () => {
      setGameModal({
        open: true,
        content: (
          <GameModal
            title={"닷지 패널티"}
            content={
              <Timer
                min={1}
                sec={5}
                action={() => {
                  setGameModal({ open: false });
                }}
              />
            }
            leftButton={{
              title: "창닫기",
              onClick: () => {
                setGameModal({ open: false });
              },
            }}
          />
        ),
      });
    });

    socket.on("WAIT", ()=>{
      console.log("wait");
      setGameModal({
        open: true,
        content: (
          <GameModal
            title={"매치 메이킹중"}
            content={<LoadingAnimation />}
            leftButton={{
              title: "취소",
              onClick: () => {
                socket.emit("CANCEL");
                setGameModal({ open: false });
              },
            }}
          />
        ),
      });
    })

    return () => {
      socket.off("LOAD");
      socket.off("PENALTY");
      socket.off("WAIT");
    };
  }, []);
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.title}`}>RATE: {rate}p</div>
      <BorderButton
        title={"MATCH START"}
        onClick={() => {
          clickMatch();
        }}
      />
      <BorderButton
        title={"BACK TO LOBBY"}
        onClick={() => {
          navigate("/Lobby");
        }}
      />
    </div>
  );
}

export default RankMatch;
