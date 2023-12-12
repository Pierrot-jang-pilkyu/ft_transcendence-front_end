import { useContext, useEffect } from "react"
import { GameContext, socket } from "../Utils"


function Reloading() {
    const [game, setGame] = useContext(GameContext);

    useEffect(()=>{
        socket.on("RELOAD", (data) => {
            setGame(data); 
        });

        return (()=>{
            socket.off("RELOAD");
        })
    }, [])

    return (
        <></>
    )
}

export default Reloading;