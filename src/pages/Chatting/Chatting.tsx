import Header from "../../components/Header";
import styles from "./Chatting.module.css";
import Outside from "./Outside";
import Avatar from "./Avatar";
import { useRef, useCallback, useEffect, useState, KeyboardEvent } from "react";
import RoomAddModal from "./RoomAddModal";
import axios from 'axios';
import socket from "./Socket";
import TestChatList from "./TestChatList";

interface User {
    name: string;
	img: string;
	state: string;
	id: string;
    op: boolean;
}

interface BackLog {
	name: string;
	img: string;
    date: string;
    chat: string;
}

interface ChattingRoom {
    start: number;
    chatId: number;
    title: string;
    private: boolean;
    users: User[];
    limits: number;
    backLogList:BackLog[];
    chatLogList:any;
}

let chatListNum = 0;

let socketOnNum = 0;

let logDay:string = "";

// Current Chatting Room
let currentCR: ChattingRoom = { start: 0,
    chatId: 0, title: "Lobby", private: false, users: [], limits: 0, backLogList: [],
    chatLogList: []
};
// chat list
let publicChatList:ChattingRoom[] = [];
let clientChatList:ChattingRoom[] = [];
let dmChatList:ChattingRoom[] = [];

function Chatting (props:any) {
    const userId = props.id;
    const [openRoomAddModal, setOpenRoomAddModal] = useState(false);

    const handleOpenModal = () => {
        setOpenRoomAddModal(true);
    };

    const handleCloseModal = () => {
        setOpenRoomAddModal(false);
    };

    // time
    let today:any = new Date();

    const timeStamp = (flag:any) => {
        let res:string = " ";

        if (flag === 1)
        {
            res += today.getFullYear() + ".";
            if (today.getMonth() + 1 < 10)
                res += "0" + (today.getMonth() + 1) + ".";
            else res += (today.getMonth() + 1) + ".";

            if (today.getDate() + 1 < 10)
                res += "0" + today.getDate() + " ";
            else res += today.getDate() + " ";

            const day:string[] = [ "", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun." ];

            res += day[today.getDay()] + " ";

            return res;
        }

        if (today.getHours() < 10)
            res += "0" + today.getHours() + ":";
        else res += today.getHours() + ":";

        if (today.getMinutes() < 10)
            res += "0" + today.getMinutes();
        else res += today.getMinutes();
     
        return res;
    }

    const timeStamp_this = (flag:any, date:string) => {
        let res:string = " ";
        let thisDay:any = new Date(
            parseInt(date.substring(0, 4)),         // year
            parseInt(date.substring(5, 7)) - 1,     // month
            parseInt(date.substring(8, 10)),         // day
            parseInt(date.substring(11, 13)),        // hours
            parseInt(date.substring(14, 16)),        // minute
            parseInt(date.substring(17, 19)),        // seconds
            parseInt(date.substring(20, 23))         // milliseconds
            );

        if (flag === 1)
        {
            res += thisDay.getFullYear() + ".";
            if (thisDay.getMonth() + 1 < 10)
                res += "0" + (thisDay.getMonth() + 1) + ".";
            else res += (thisDay.getMonth() + 1) + ".";

            if (thisDay.getDate() + 1 < 10)
                res += "0" + thisDay.getDate() + " ";
            else res += thisDay.getDate() + " ";

            const day:string[] = [ "", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun." ];

            res += day[thisDay.getDay()] + " ";

            return res;
        }

        if (thisDay.getHours() < 10)
            res += "0" + thisDay.getHours() + ":";
        else res += thisDay.getHours() + ":";

        if (thisDay.getMinutes() < 10)
            res += "0" + thisDay.getMinutes();
        else res += thisDay.getMinutes();
     
        return res;
    }

    const announce:string
    = "명령어";

    const [chat, setChat] = useState('');
    const [chatId, setChatId] = useState<number>(0);
    const [chatTitle, setChatTitle] = useState('Lobby');
    const [chatAvatar, setChatAvatar] = useState<any>([<li><div className={styles.profile_font}>{" \" Carpe Diem ! \" "}</div></li>]);
    const [chatLog, setChatLog] = useState<any>([
        <li>
            <div className={styles.chatting_start}>
                <div className={styles.chatting_start_font}>Looby</div>
            </div>
        </li>,
        <li>
            <div className={`${styles.chat} ${styles.chat_start}`}>
                <div className={`${styles.chat_image}`}>
                    <div className="w-10 rounded-full">
                        <img className={styles.rounded_avatar} src={"./src/assets/img_Profile.png"} />
                    </div>
                </div>
                <div className={`${styles.chat_header}`}>
                    {"Admin"}
                    <time className={`${styles.text_xs} ${styles.opacity_50}`}>{timeStamp(0)}</time>
                </div>
                <div className={`${styles.chat_bubble}`}>{announce}</div>
                <div className={`${styles.chat_footer} ${styles.opacity_50}`}>
                </div>
            </div>
        </li>
    ]);

    let lobby:ChattingRoom;

    lobby = { start: -1, chatId: 0, title: "Lobby", private: false, users: [], limits: 0, backLogList: [], chatLogList: [] };

    const [me, setMe] = useState();
    const [other, setOther] = useState();
    const [roomListMe, setRoomListMe] = useState<ChattingRoom[]>([lobby, ]);
    const [roomListOther, setRoomListOther] = useState<ChattingRoom[]>([]);
    const [dmList, setDMList] = useState<ChattingRoom[]>([]);

    clientChatList = roomListMe;
    publicChatList = roomListOther;

    // console.log(clientChatList.length);
    // console.log(roomListMe.length);
    // console.log("--------------------");
    // console.log(publicChatList);
    // console.log(publicChatList.length);
    // console.log(roomListOther.length);


    currentCR.chatId = chatId;
    currentCR.title = chatTitle;
    currentCR.chatLogList = chatLog;

    const outside = () => {
        const toggle: any = document.getElementById("menu");
        const menu: any = document.getElementById("main_nav");

        document.onclick = function (e: any) {
            if (e.target.id !== "toggle" && e.target.id !== "menu") {
                toggle.classList.remove("active");
                menu.classList.remove("active");
            }
        }
    }

    const viewAvatar = () => {
        const res:any = [];

        if (currentCR.chatId === 0 || currentCR.users.length === 0)
        {
            res.push(<li><div className={styles.profile_font}>{" \" Carpe Diem ! \" "}</div></li>);
            return res;
        }
        
        for (let i = 0; i < currentCR.users.length; ++i)
        {
            // 이미지, 방장여부, 상태(온라인, 게임중, 오프라인) 받기
            res.push(
                <li>
                    <Avatar name={currentCR.users[i].name} img={currentCR.users[i].img} state={currentCR.users[i].state} />
                </li>
            );
        }

        return res;
    };

    const thisDayStamp = (log:any, date:string) => {
        if (logDay === date.substring(0, 10))
            return ;
        else
        {
            logDay = date.substring(0, 10);
            log.push(<li>
                <div className={styles.chatting_start}>
                    <div className={styles.chatting_start_font}>{timeStamp_this(1, date)}</div>
                </div>
                </li>);
        }
    };

    const onChatting = (cr:ChattingRoom) => {

        const res:any = [];

        cr.chatLogList.splice(0, cr.chatLogList.length);
    
        if (cr.backLogList.length === 0 && cr.start === 0)
        {
            cr.start = 1;
            // cr.chatLogList = chatLog;
            res.push(<li>
                <div className={styles.chatting_start}>
                    <div className={styles.chatting_start_font}>{timeStamp(1)}</div>
                </div>
                </li>);
        }
        else if (cr.start === -1)
        {
            res.push(<li>
                <div className={styles.chatting_start}>
                    <div className={styles.chatting_start_font}>Looby</div>
                </div>
            </li>)
            res.push(<li>
                <div className={`${styles.chat} ${styles.chat_start}`}>
                    <div className={`${styles.chat_image}`}>
                        <div className="w-10 rounded-full">
                            <img className={styles.rounded_avatar} src={"./src/assets/img_Profile.png"} />
                        </div>
                    </div>
                    <div className={`${styles.chat_header}`}>
                        {"Admin"}
                        <time className={`${styles.text_xs} ${styles.opacity_50}`}>{timeStamp(0)}</time>
                    </div>
                    <div className={`${styles.chat_bubble}`}>{announce}</div>
                    <div className={`${styles.chat_footer} ${styles.opacity_50}`}>
                    </div>
                </div>
            </li>)
        }

        for (let i = 0; i < cr.backLogList.length; ++i)
        {
            // if (cr.backLogList[i].name === props.name)
            if (cr.backLogList[i].name === "bread")
            {
                thisDayStamp(res, cr.backLogList[i].date);
                res.push(<li>
                    <div className={ `${styles.chat} ${styles.chat_end}` }>
                        <div className={ `${styles.chat_image}` }>
                            <div className="w-10 rounded-full">
                                <img className={styles.rounded_avatar} src={cr.backLogList[i].img} />
                            </div>
                        </div>
                        <div className={ `${styles.chat_header}` }>
                            {cr.backLogList[i].name}
                            <time className={ `${styles.text_xs} ${styles.opacity_50}` }>{ timeStamp_this(0, cr.backLogList[i].date) }</time>
                        </div>
                        <div className={ `${styles.chat_bubble}` }>{cr.backLogList[i].chat}</div>
                        <div className={ `${styles.chat_footer} ${styles.opacity_50}` }>
                        </div>
                    </div>
                </li>);
            }
            else
            {
                thisDayStamp(res, cr.backLogList[i].date);
                res.push(<li>
                    <div className={ `${styles.chat} ${styles.chat_start}` }>
                        <div className={ `${styles.chat_image}` }>
                            <div className="w-10 rounded-full">
                                <img className={styles.rounded_avatar} src={cr.backLogList[i].img} />
                            </div>
                        </div>
                        <div className={ `${styles.chat_header}` }>
                            {cr.backLogList[i].name}
                            <time className={ `${styles.text_xs} ${styles.opacity_50}` }>{ timeStamp_this(0, cr.backLogList[i].date) }</time>
                        </div>
                        <div className={ `${styles.chat_bubble}` }>{cr.backLogList[i].chat}</div>
                        <div className={ `${styles.chat_footer} ${styles.opacity_50}` }>
                        </div>
                    </div>
                </li>);
            }
        }

        return res;
    };

    const [viewRoomList, setViewRoomList] = useState<any>([]);

    const viewChattingRoomList = () => {
        let res:any = [];

        if (chatListNum === 0)
        {
            chatListNum++;

            return ;
        }
        
        for (let i = 0; i < clientChatList.length; ++i)
        {
            res.push(<li>
                <div id={ clientChatList[i].title } className={styles.chatlist_font} >{ clientChatList[i].title }</div>
            </li>);
        }
        
        for (let i = 0; i < publicChatList.length; ++i)
        {
            res.push(<li>
                <div id={ publicChatList[i].title } className={styles.chatlist_font_other} >{ publicChatList[i].title }</div>
            </li>);
        }

        return res;
    };

    // useEffect(() => {

    // }, [viewRoomList, chatLog]);

    useEffect(() => {
        // axios.get(`http://localhost:3000/users/${userId}/channels`)
        if (clientChatList.length === 1)
        {
            axios.get(`http://localhost:3000/users/${2}/channels/me`)
            .then((Response)=>{
                setMe(Response.data);
                // console.log("me");
                // console.log(Response.data);
                for (let i = 0; i < Response.data.length; ++i)
                {
                    // console.log(Response.data[i]);
                    { Response.data[i].public && clientChatList.push({ start: 1, chatId: Response.data[i].id, title: Response.data[i].title, private: false, users: [], limits: Response.data[i].limit, backLogList: [], chatLogList: [] })};
                    { !Response.data[i].public && clientChatList.push({ start: 1, chatId: Response.data[i].id, title: Response.data[i].title, private: true, users: [], limits: Response.data[i].limit, backLogList: [], chatLogList: [] })};
                }
                setRoomListMe(clientChatList);
                clientChatList = roomListMe;
                setViewRoomList(viewChattingRoomList());
            })
            .catch((Error)=>{console.log(Error)})
        }
        if (publicChatList.length === 0)
        {
            axios.get(`http://localhost:3000/users/${2}/channels/other`)
            .then((Response) => {
                setOther(Response.data);
                // console.log("other");
                // console.log(Response.data);
                for (let i = 0; i < Response.data.length; ++i)
                {
                    // console.log(Response.data[i]);
                    { Response.data[i].public && publicChatList.push({ start: 0, chatId: Response.data[i].id, title: Response.data[i].title, private: false, users: [], limits: Response.data[i].limit, backLogList: [], chatLogList: [] })};
                    { !Response.data[i].public && publicChatList.push({ start: 0, chatId: Response.data[i].id, title: Response.data[i].title, private: true, users: [], limits: Response.data[i].limit, backLogList: [], chatLogList: [] })};
                }
                setRoomListOther(publicChatList);
                publicChatList = roomListOther;
                setViewRoomList(viewChattingRoomList());
            })
            .catch((Error)=>{console.log(Error)})
        }

        socket.connect();
        // socket.emit("REGIST", userId);
        socket.emit("REGIST", 2);

        function onLoadChat (responseData:any) {
            console.log("LOADCHAT");
            console.log(responseData);
            
            for (let i = responseData.length - 1; i > -1; --i)
            {
                currentCR.backLogList.push({ name: responseData[i].user.name, img: responseData[i].user.avatar, date: responseData[i].date, chat: responseData[i].content });
            }
    
            // onChatting(currentCR);
            setChatLog(onChatting(currentCR));
            // currentCR.chatLogList = chatLog;
        }

        function onInfoChList (responseData:any) {
            console.log("INFO_CH_LIST");
            console.log(responseData);
    
            clientChatList.splice(0, clientChatList.length);
            clientChatList.push(lobby);
            publicChatList.splice(0, publicChatList.length);
    
            for (let i = 0; i < responseData.me.length; ++i) {
                // console.log(responseData.me[i]);
                { responseData.me[i].public && clientChatList.push({ start: 1, chatId: responseData.me[i].id, title: responseData.me[i].title, private: false, users: [], limits: responseData.me[i].limit, backLogList: [], chatLogList: [] }) };
                { !responseData.me[i].public && clientChatList.push({ start: 1, chatId: responseData.me[i].id, title: responseData.me[i].title, private: true, users: [], limits: responseData.me[i].limit, backLogList: [], chatLogList: [] }) };
            }
    
            for (let i = 0; i < responseData.other.length; ++i) {
                // console.log(responseData.other[i]);
                { responseData.other[i].public && publicChatList.push({ start: 1, chatId: responseData.other[i].id, title: responseData.other[i].title, private: false, users: [], limits: responseData.other[i].limit, backLogList: [], chatLogList: [] }) };
                { !responseData.other[i].public && publicChatList.push({ start: 1, chatId: responseData.other[i].id, title: responseData.other[i].title, private: true, users: [], limits: responseData.other[i].limit, backLogList: [], chatLogList: [] }) };
            }
    
            setViewRoomList(viewChattingRoomList());
        }

        function onInfoChMem (responseData:any) {
            console.log("INFO_CH_MEMBER");
            console.log(responseData);

            // code
            currentCR.users.splice(0, currentCR.users.length);
            for (let i = 0; i < responseData.length; ++i) {
                currentCR.users.push({
                    name: responseData[i].user.name, 
                    img: "./src/assets/img_Profile.png", 
                    state: responseData[i].user.status, 
                    id: responseData[i].user.id, 
                    op: responseData[i].op
                });
                // console.log(currentCR.users[i]);
            }

            setChatAvatar(viewAvatar());
        }

        socket.on("LOADCHAT", onLoadChat);
        socket.on("INFO_CH_LIST", onInfoChList);
        socket.on("INFO_CH_MEMBER", onInfoChMem);

        return (() => {
            socket.disconnect();
            socket.off("LOADCHAT", onLoadChat);
            socket.off("INFO_CH_LIST", onInfoChList);
            socket.off("INFO_CH_MEMBER", onInfoChMem);
        });
        
    }, [])

    useEffect( () => {
        const enterChatRoom = (e:any) => {

            function enter(chatId:number, userId:number, password:string) {
                // userId: userId
                if (chatId === 0)
                    return ;
                console.log("channelId: " + chatId + ", userId: " + 2 + ", password: " + password);
                // socket.emit('JOIN', { channelId: chatId, userId: userId, password: password });
                socket.emit('JOIN', { channelId: chatId, userId: 2, password: password });
            }
            
            for (let i = 0; i < clientChatList.length; ++i)
            {
                if (e.target.id === (clientChatList[i].title))
                {
                    logDay = "";
                    currentCR.start = clientChatList[i].start;
                    setChatTitle(clientChatList[i].title);
                    setChatId(clientChatList[i].chatId);
                    currentCR.backLogList = clientChatList[i].backLogList;
                    currentCR.users = clientChatList[i].users;
                    if (e.target.id !== "Lobby")
                    {
                        enter(clientChatList[i].chatId, userId, "");
                    }
                    else
                    {
                        setChatAvatar(viewAvatar());
                        setChatLog(onChatting(currentCR));
                    }
                }
            }
            
            for (let i = 0; i < publicChatList.length; ++i)
            {
                if (e.target.id === (publicChatList[i].title))
                {
                    logDay = "";
                    currentCR.start = publicChatList[i].start;
                    setChatTitle(publicChatList[i].title);
                    setChatId(publicChatList[i].chatId);
                    currentCR.backLogList = publicChatList[i].backLogList;
                    currentCR.users = publicChatList[i].users;
                    if (e.target.id !== "Lobby")
                    {
                        enter(clientChatList[i].chatId, userId, "");
                    }
                    else
                    {
                        setChatAvatar(viewAvatar());
                        setChatLog(onChatting(currentCR));
                    }
                }
            }
        };
        
        document.addEventListener('click', enterChatRoom);
        
        return (() => {
            document.removeEventListener('click', enterChatRoom)
        });
        
    }, []);

    const onChange = (e:any) => {
		setChat(e.target.value);

		// test();
	};

	const onAddButton = () => {
        if ((chat === '') || currentCR.chatId === 0)
		{
            return '';
		}
        
        currentCR.chatLogList.push(
            <li>
            <div className={ `${styles.chat} ${styles.chat_end}` }>
                <div className={ `${styles.chat_image}` }>
                    <div className="w-10 rounded-full">
                        <img className={styles.rounded_avatar} src={props.avatar} />
                    </div>
                </div>
                <div className={ `${styles.chat_header}` }>
                    {props.name}
                    <time className={ `${styles.text_xs} ${styles.opacity_50}` }>{ timeStamp(0) }</time>
                </div>
                <div className={ `${styles.chat_bubble}` }>{ chat }</div>
                <div className={ `${styles.chat_footer} ${styles.opacity_50}` }>
                </div>
            </div>
        </li>);

        setChatLog(currentCR.chatLogList);
        currentCR.chatLogList = chatLog;

        setChat('');
	};

    const activeEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && e.nativeEvent.isComposing === false)
        {
            onAddButton();
        }
    }

    const viewRoomMenu = () => {
        const res:any = [];

        if (currentCR.chatId === 0)
        {
            res.push(
                <label className={`${styles.chattingroom_menu_button}`} htmlFor="menu111">
                    <img className={styles.chattingroom_menu_button_img} src="./src/assets/Chattingroommenu.svg" />
                </label>
            );
        }
        else
        {
            res.push(
                <label className={`${styles.chattingroom_menu_button}`} htmlFor="menu">
                    <img className={styles.chattingroom_menu_button_img} src="./src/assets/Chattingroommenu.svg" />
                </label>
            );
        }

        return res;
    };

    const viewInput = () => {
        const res:any = [];

        if (currentCR.chatId === 0)
        {
            res.push(
                <div className={`${styles.lobby_input_container}`}>
                </div>
            );
        }
        else
        {
            res.push(
                <div className={`${styles.input_container}`}>
                    <div className="input-group">
                        <input type="text" placeholder="" className={`${styles.input}`} value={chat} onChange={onChange} onKeyDown={activeEnter} />
                        <img className={styles.send_container} src="./src/assets/Mesage_send.svg" onClick={onAddButton} ></img>
                    </div>
                </div>
            );
        }

        return res;
    };

    const scrollRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (scrollRef.current?.scrollTop != null)
        {
            scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
        }
    });

    return (
		<div className={`${styles.background}`}>
			<Header />
            <div className={styles.container}>
                <div className={styles.item}>
                    <div className={styles.chatlist_title}>
                        <div className={styles.chatlist_title_font}>Room List</div>
                    </div>
                    <div className={styles.chatlist}>
                        <ul>
                            { viewRoomList }
                        </ul>
                    </div>
                    <div className={styles.room_add} onClick={handleOpenModal} >+</div>
                    <div className={styles.line}></div>
                    <div className={styles.dmlist_title}>
                        <div className={styles.dmlist_title_font}>DM List</div>
                    </div>
                    <div className={styles.dmlist}>
                        <ul>
                            <li><div className={styles.dmlist_font}>1</div></li>
                            <li><div className={styles.dmlist_font}>2</div></li>
                            <li><div className={styles.dmlist_font}>3</div></li>
                            <li><div className={styles.dmlist_font}>4</div></li>
                            <li><div className={styles.dmlist_font}>5</div></li>
                            <li><div className={styles.dmlist_font}>6</div></li>
                            <li><div className={styles.dmlist_font}>7</div></li>
                            <li><div className={styles.dmlist_font}>8</div></li>
                            <li><div className={styles.dmlist_font}>9</div></li>
                            <li><div className={styles.dmlist_font}>10</div></li>
                            <li><div className={styles.dmlist_font}>11</div></li>
                            <li><div className={styles.dmlist_font}>12</div></li>
                            <li><div className={styles.dmlist_font}>13</div></li>
                            <li><div className={styles.dmlist_font}>14</div></li>
                            <li><div className={styles.dmlist_font}>15</div></li>
                            <li><div className={styles.dmlist_font}>16</div></li>
                            <li><div className={styles.dmlist_font}>17</div></li>
                            <li><div className={styles.dmlist_font}>18</div></li>
                            <li><div className={styles.dmlist_font}>19</div></li>
                            <li><div className={styles.dmlist_font}>20</div></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.item}>
                    <div id="profile" className={styles.profiles}>
                        { chatAvatar }
                    </div>
                    <div className={styles.chattingroom}>
                        <div className={styles.chattingroom_title}>
                            <div className={styles.chattingroom_title_font}>{ currentCR.title }</div>
                        </div>
                        { viewRoomMenu() }
                        <input id="menu" type="checkbox" />
                        <nav id="main_nav" >
                            <div className={`${styles.chattingroom_menu}`}>
                                <ul>
                                    <li><div className={styles.chattingroom_menu_font1}>방이름 편집</div></li>
                                    <li><div className={styles.chattingroom_menu_font2}>채팅방 나가기</div></li>
                                </ul>
                            </div>
                        </nav>
                        <div className={styles.line1}></div>
                        <div className={styles.chatting} ref={scrollRef} >
                            <ul>
                                { chatLog }
                            </ul>
                        </div>
                        <div className={styles.line2}></div>
                        { viewInput() }
                    </div>
                </div>
            </div>
            { openRoomAddModal &&  <RoomAddModal onClose={handleCloseModal} id={userId} />}
		</div>
	)
}

export default Chatting;
