import { useEffect } from "react";
import { socket, Status} from "../Utils";

function Loading({setRoom, setStatus, userId}) {

    useEffect(() => {
        socket.on("LOAD", (data) => {
            setRoom(data);
            setStatus(Status.Setting);
        });

        socket.on("RELOAD", (data) => {
            setRoom(data);
            setStatus(Status.Gaming);
        });

		socket.emit("REGIST", parseInt(userId));
		socket.emit("MATCH", parseInt(userId));

        return (()=>{
            socket.off("LOAD");
            socket.off("RELOAD");
        })
    }, [])

    return (
        <div>spinner</div>
    );
}

export default Loading;