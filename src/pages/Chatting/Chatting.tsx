import Header from "../../components/Header";
import styles from "./Chatting.module.css";
import Outside from "./Outside";
import Avatar from "./Avatar";
import { useRef, useCallback, useEffect, useState, KeyboardEvent } from "react";

interface User {
    name: string;
	img: string;
	state: string;
    op: boolean;
}

interface BackLog {
	name: string;
	img: string;
	state: string;
    chatId: string;
    chat: string;
}

interface ChattingRoom {
    start: number;
    chatId: string;
    private: boolean;
    users: string[];
    backLogList:BackLog[];
    chatLogList:any;
}

let chatListNum = 0;

// Current Chatting Room
let currentCR: ChattingRoom = { start: 0,
    chatId: "Lobby", private: false, users: [], backLogList: [],
    chatLogList: []
};
// chat list
const publicChatList:ChattingRoom[] = [];
const clientChatList:ChattingRoom[] = [];
const dmChatList:ChattingRoom[] = [];

const viewChattingList:any = [];

function Chatting (props:any) {
    const [isOpen, setIsOpen] = useState(true);
    const [chat, setChat] = useState('');
    const [chatId, setChatId] = useState('Lobby');
    const [chatLog, setChatLog] = useState<any>([
        <li>
            <div className={styles.chatting_start}>
                <div className={styles.chatting_start_font}>Looby</div>
            </div>
        </li>
    ]);

    currentCR.chatId = chatId;
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
        const users:User[] = [];

        if (currentCR.chatId === "Lobby")
        {
            res.push(<li><div className={styles.profile_font}>{" \" Carpe Diem ! \" "}</div></li>);
            return res;
        }
        
        for (let i = 0; i < currentCR.users.length; ++i)
        // for (let i = 0; i < 1; ++i)
        {
            // back쪽에 닉네임 보내기.
            currentCR.users[i];
            
            users.push(
                { name: currentCR.users[i], img: i === 0? props.avatar : "./src/assets/img_Profile.png", state: "online", op: i === 0 ? true : false }
                );
                
                const profile = document.getElementById("profile");
                console.log(profile);
            // 이미지, 방장여부, 상태(온라인, 게임중, 오프라인) 받기
            res.push(
                <li><Avatar name={users[i].name} img={users[i].img} state={users[i].state} /></li>
            );
        }

        return res;
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

    let tempCR:ChattingRoom;

    tempCR = { start: 0, chatId: "test", private: false, users: [ props.name, "test" ], backLogList: [], chatLogList: [] };


    clientChatList.push(tempCR);

    const onChatting = (cr:ChattingRoom) => {

        if (cr.backLogList.length === 0 && cr.start === 0)
        {
            cr.start = 1;
            cr.chatLogList.splice(0, cr.chatLogList.length);
            cr.chatLogList = chatLog;
            cr.chatLogList.push(<li>
                <div className={styles.chatting_start}>
                    <div className={styles.chatting_start_font}>{timeStamp(1)}</div>
                </div>
                </li>);

            cr.chatLogList.push(
                <li>
                    <div className={`${styles.chat} ${styles.chat_start}`}>
                        <div className={`${styles.chat_image}`}>
                            <div className="w-10 rounded-full">
                                <img className={styles.rounded_avatar} src={"./src/assets/img_Profile.png"} />
                            </div>
                        </div>
                        <div className={`${styles.chat_header}`}>
                            {"test"}
                            <time className={`${styles.text_xs} ${styles.opacity_50}`}>{timeStamp(0)}</time>
                        </div>
                        <div className={`${styles.chat_bubble}`}>{"Hello"}</div>
                        <div className={`${styles.chat_footer} ${styles.opacity_50}`}>
                        </div>
                    </div>
                </li>
            );
        }

        for (let i = 0; i < cr.backLogList.length; ++i)
        {
            if (cr.backLogList[i].name === props.name)
            {
                cr.chatLogList.push(<li>
                    <div className={ `${styles.chat} ${styles.chat_end}` }>
                        <div className={ `${styles.chat_image}` }>
                            <div className="w-10 rounded-full">
                                <img className={styles.rounded_avatar} src={cr.backLogList[i].img} />
                            </div>
                        </div>
                        <div className={ `${styles.chat_header}` }>
                            {cr.backLogList[i].name}
                            <time className={ `${styles.text_xs} ${styles.opacity_50}` }>{ timeStamp(0) }</time>
                        </div>
                        <div className={ `${styles.chat_bubble}` }>{cr.backLogList[i].chat}</div>
                        <div className={ `${styles.chat_footer} ${styles.opacity_50}` }>
                        </div>
                    </div>
                </li>);
            }
            else
            {
                cr.chatLogList.push(<li>
                    <div className={ `${styles.chat} ${styles.chat_start}` }>
                        <div className={ `${styles.chat_image}` }>
                            <div className="w-10 rounded-full">
                                <img className={styles.rounded_avatar} src={cr.backLogList[i].img} />
                            </div>
                        </div>
                        <div className={ `${styles.chat_header}` }>
                            {cr.backLogList[i].name}
                            <time className={ `${styles.text_xs} ${styles.opacity_50}` }>{ timeStamp(0) }</time>
                        </div>
                        <div className={ `${styles.chat_bubble}` }>{cr.backLogList[i].chat}</div>
                        <div className={ `${styles.chat_footer} ${styles.opacity_50}` }>
                        </div>
                    </div>
                </li>);
            }
        }
    };

    const viewChattingRoomList = () => {
        const res:any = [];

        if (chatListNum > 0)
            return ;

        chatListNum++;
        
        for (let i = 0; i < clientChatList.length; ++i)
        {
            viewChattingList.push(<li>
                <div id={ clientChatList[i].chatId } className={styles.chatlist_font} >{ clientChatList[i].chatId }</div>
            </li>);
        }

        return res;
    };

    viewChattingRoomList();

    useEffect( () => {

        const closeDropdown = (e:any) => {
            // const chatListDiv: any = [];

            // for (let i = 0; i < clientChatList.length; ++i)
            // {
            //     chatListDiv.push(document.getElementById(clientChatList[i].chatId));
            // }

            // document.onclick = function (e: any) {
            //     for (let i = 0; i < clientChatList.length; ++i)
            //     {
            //         if (e.target.id === (clientChatList[i].chatId)) {
            //             currentCR.backLogList = clientChatList[i].backLogList;
            //             currentCR.chatId = clientChatList[i].chatId;
            //             currentCR.users = clientChatList[i].users;
            //             onChatting(currentCR);
            //         }
            //     }
            // }
            
            for (let i = 0; i < clientChatList.length; ++i)
            {
                if (e.target.id === (clientChatList[i].chatId))
                {
                    currentCR.start = clientChatList[i].start;
                    currentCR.backLogList = clientChatList[i].backLogList;
                    setChatId(clientChatList[i].chatId);
                    currentCR.users = clientChatList[i].users;
                    onChatting(currentCR);
                }
            }
        };
        
        document.body.addEventListener('click', closeDropdown);
        
        return () => document.body.addEventListener('click', closeDropdown);
        
    }, []);

    const onChange = (e:any) => {
		setChat(e.target.value);

		// test();
	};

	const onAddButton = () => {
        if ((chat === '') || currentCR.chatId === "Lobby")
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

        if (currentCR.chatId === "Lobby")
        {
            res.push(
                <label className={`${styles.chattingroom_menu_button}`} htmlFor="menu111" onClick={ () => setIsOpen( prev => !prev ) }>
                    <img className={styles.chattingroom_menu_button_img} src="./src/assets/Chattingroommenu.svg" />
                </label>
            );
        }
        else
        {
            res.push(
                <label className={`${styles.chattingroom_menu_button}`} htmlFor="menu" onClick={ () => setIsOpen( prev => !prev ) }>
                    <img className={styles.chattingroom_menu_button_img} src="./src/assets/Chattingroommenu.svg" />
                </label>
            );
        }

        return res;
    };

    const viewInput = () => {
        const res:any = [];

        if (currentCR.chatId === "Lobby")
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
                        <div className={styles.chatlist_title_font}>Chatting Room List</div>
                    </div>
                    <div className={styles.chatlist}>
                        <ul>
                            { viewChattingList }
                            <li><div className={styles.chatlist_font}>2</div></li>
                            <li><div className={styles.chatlist_font}>3</div></li>
                            <li><div className={styles.chatlist_font}>4</div></li>
                            <li><div className={styles.chatlist_font}>5</div></li>
                            <li><div className={styles.chatlist_font}>6</div></li>
                            <li><div className={styles.chatlist_font}>7</div></li>
                            <li><div className={styles.chatlist_font}>8</div></li>
                            <li><div className={styles.chatlist_font}>9</div></li>
                            <li><div className={styles.chatlist_font}>10</div></li>
                            <li><div className={styles.chatlist_font}>11</div></li>
                            <li><div className={styles.chatlist_font}>12</div></li>
                            <li><div className={styles.chatlist_font}>13</div></li>
                            <li><div className={styles.chatlist_font}>14</div></li>
                            <li><div className={styles.chatlist_font}>15</div></li>
                            <li><div className={styles.chatlist_font}>16</div></li>
                            <li><div className={styles.chatlist_font}>17</div></li>
                            <li><div className={styles.chatlist_font}>18</div></li>
                            <li><div className={styles.chatlist_font}>19</div></li>
                            <li><div className={styles.chatlist_font}>20</div></li>
                        </ul>
                    </div>
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
                        { viewAvatar() }
                    </div>
                    <div className={styles.chattingroom}>
                        <div className={styles.chattingroom_title}>
                            <div className={styles.chattingroom_title_font}>{ currentCR.chatId }</div>
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
                                {/* { chatLog } */}
                                { currentCR.chatLogList }
                            </ul>
                        </div>
                        <div className={styles.line2}></div>
                        { viewInput() }
                    </div>
                </div>
            </div>
		</div>
	)
}

export default Chatting;
