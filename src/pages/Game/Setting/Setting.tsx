import styles from "./Setting.module.css";
import { useContext, useEffect, useState } from "react";
import { GameContext, GameModalContext, socket } from "../Utils";
import ChattingRoom from "../ChattingRoom/ChattingRoom";
import AnnounceBar from "../AnnounceBar/AnnounceBar";
import Mode from "./Mode/Mode";
import { useNavigate } from "react-router-dom";
import GameModal from "../GameModal/GameModal";
import axios from "axios";
import { LoginContext } from "../../../App";

function Setting() {
  const [game, setGame] = useContext(GameContext);
  const [gameModal, setGameModal] = useContext(GameModalContext);
  const [login, setLogin] = useContext(LoginContext);
  const [option, setOption] = useState({
    speed: 5,
    ballSize: 5,
    barSize: 5,
  });
  const [ready, setReady] = useState({ left: false, right: false });
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("OPTION", (data) => {
      setOption(data);
    });

    socket.on("READY", (data) => {
      setReady({
        left: data.room.left.isReady,
        right: data.room.right.isReady,
      });
    });

    socket.on("START", (data) => {
      setGame(data);
    });

    socket.on("DODGE", () => {
      setGameModal({
        open: true,
        content: (
          <GameModal
            title={"상대방 닷지"}
            content={
              <div>
                상대방이 나갔습니다.
                <br />
                버튼을 누르면 로비로 이동합니다.
              </div>
            }
            leftButton={{
              title: "로비로",
              onClick: () => {
                setGameModal({ open: false });
                navigate("/Lobby");
              },
            }}
          />
        ),
      });
    });
    const handleNotice = (data) => {
      console.log(data);
      switch (data.code) {
        case 201:
          axios.defaults.withCredentials = true;
          axios
            .post("http://"+import.meta.env.VITE_BACKEND+"/auth/logout")
            .then((response) => {
              setLogin(false);
              navigate("/");
            })
            .catch((error) => {
              if (error.response.data.message === "Unauthorized") {
                axios.get("http://"+import.meta.env.VITE_BACKEND+"/auth/refresh/login");
              }
              console.log(error);
            });
          break;
        case 202:
          axios
            .get("http://"+import.meta.env.VITE_BACKEND+"/auth/refresh/2fa")
            .then((res) => {
              console.log(res.data);
            })
            .catch((error) => {
              setLogin(false);
              console.log("");
              navigate("/");
            });
          break;
      }
    };
    socket.on("NOTICE", (data) => handleNotice(data));

    return () => {
      socket.off("NOTICE");
      socket.off("READY");
      socket.off("START");
      socket.off("OPTION");
    };
  }, []);

  return (
    <div>
      <Mode
        option={option}
        author={!game.room.rank && game.isLeft && !ready.left}
        ready={ready}
      />
      <AnnounceBar />
      <ChattingRoom isLeft={game.isLeft} />
    </div>
  );
}

export default Setting;
