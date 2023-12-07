import { useContext, useEffect } from "react";
import { GameContext, socket } from "../Utils";

function FriendMatch({invite})
{
    const [game, setGame] = useContext(GameContext);

    useEffect(()=>{
        socket.on("LOAD", (data) => {
            setGame(data);
        });

        socket.emit("JOIN", invite);

        return (()=>{
            socket.off("LOAD");
        })
    }, [])

    return (
        <></>
    );
}

export default FriendMatch;