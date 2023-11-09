import Header from "../../components/Header";
import styles from "./Chatting.module.css";
import Outside from "./Outside";
import { useEffect, useState } from "react";

interface User {
    name: string;
	img: string;
	state: string;
}

interface BackLog {
	name: string;
	img: string;
	state: string;
    chatId: string;
    chat: string;
}

interface ChattingRoom {
    chatId: string;
    private: boolean;
    users: string[];
    backLogList:BackLog[];
    chatLogList:any;
}

let start = 0;

// Current Chatting Room
let currentCR:ChattingRoom = { chatId: "Lobby", private: false, users: [], backLogList: [], 
chatLogList: [<li>
    <div className={styles.chatting_start}>
        <div className={styles.chatting_start_font}>Looby</div>
    </div>
</li>] };

// chat list
const publicChatList:ChattingRoom[] = [];
const clientChatList:ChattingRoom[] = [];
const dmChatList:ChattingRoom[] = [];

const viewChattingList:any = [];

function Chatting (props:any) {

    const [isOpen, setIsOpen] = useState(true);
    const [chat, setChat] = useState('');
    const [chatLog, setChatLog] = useState<any>([]);

    // useEffect( () => {

    //     const closeDropdown = (e:any) => {
    //         console.log(e);
    //         setIsOpen(false);
    //     }

    //     document.body.addEventListener('click', closeDropdown);

    //     return () => document.body.addEventListener('click', closeDropdown);

    // }, []);

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

    // time
    let today:any = new Date();

    const timeStamp = (flag:any) => {
        let res:string = " ";

        if (flag === 1)
        {
            res += today.getFullYear() + ".";
            if (today.getMonth() + 1 < 10)
                res += "0" + today.getMonth() + ".";
            else res += today.getMonth() + ".";

            if (today.getDate() + 1 < 10)
                res += "0" + today.getDate() + " ";
            else res += today.getDate() + " ";

            const day:string[] = [ "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun." ];

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

    

    // currentCR.chatId = "Lobby";
    // currentCR.chatLogList.push(<li>
    //     <div className={styles.chatting_start}>
    //         <div className={styles.chatting_start_font}>Looby</div>
    //     </div>
    // </li>);


    let tempCR:ChattingRoom;

    tempCR = { chatId: "test", private: false, users: [ props.name, "test" ], backLogList: [], chatLogList: [] };


    clientChatList.push(tempCR);

    const onChatting = (cr:ChattingRoom) => {

        if (cr.backLogList.length === 0 && start === 0)
        {
            console.log(2);
            start = 1;
            cr.chatLogList.slice(0, cr.chatLogList.length);
            cr.chatLogList = chatLog;
            cr.chatLogList.push(<li>
                <div className={styles.chatting_start}>
                    <div className={styles.chatting_start_font}>{timeStamp(1)}</div>
                </div>
                </li>);
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
    
    const clickCR:any = (type:string , i:number) => {
        
        // const chatListDiv: any = document.getElementById(type + i.toString());
        // console.log(chatListDiv);

        
        // document.onclick = function (e: any) {
        //     if (e.target.id === (type + i.toString())) {
        //     }
        // }
        if (type === "client")
        {
            currentCR.backLogList = clientChatList[i].backLogList;
            currentCR.chatId = clientChatList[i].chatId;
            currentCR.users = clientChatList[i].users;
            console.log(start);
            onChatting(currentCR);
            console.log(start);
        }
        if (type === "public")
        {
            currentCR.backLogList = publicChatList[i].backLogList;
            currentCR.chatId = publicChatList[i].chatId;
            currentCR.users = publicChatList[i].users;
            onChatting(currentCR);
        }
        if (type === "dm")
        {
            currentCR.backLogList = dmChatList[i].backLogList;
            currentCR.chatId = dmChatList[i].chatId;
            currentCR.users = dmChatList[i].users;
            onChatting(currentCR);
        }
        // console.log(currentCR.chatId);
    };

    const viewChattingRoomList = () => {
        const res:any = [];

        for (let i = 0; i < clientChatList.length; ++i)
        {
            viewChattingList.push(<li>
                {/* <button id={ clientChatList[i].chatId } className={styles.chatlist_font} onClick={ clickCR("client", i) }>{ clientChatList[i].chatId }</button> */}
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
            console.log(e.target.id);
            
            for (let i = 0; i < clientChatList.length; ++i)
            {
                if (e.target.id === (clientChatList[i].chatId))
                {
                    console.log(1);
                    currentCR.backLogList = clientChatList[i].backLogList;
                    currentCR.chatId = clientChatList[i].chatId;
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
        
        console.log(props.name);
        console.log(props.avatar);
        console.log(chat);
        console.log(currentCR.chatLogList);
        
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
        console.log(props.name);
        console.log(props.avatar);
        console.log(chat);
        console.log(currentCR.chatLogList);

        setChatLog(currentCR.chatLogList);
        currentCR.chatLogList = chatLog;

        setChat('');
	};

    const viewLog = () => {
        const res:any = [];

        for (let i = 0; i < currentCR.chatLogList.length; ++i)
        {
            res.push(currentCR.chatLogList[i]);
        }

        return res;
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
                        <input type="text" placeholder="" className={`${styles.input}`} value={chat} onChange={onChange} />
                        <img className={styles.send_container} src="./src/assets/Mesage_send.svg" onClick={onAddButton} ></img>
                    </div>
                </div>
            );
        }

        return res;
    };

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
                    {/* {refresh()} */}
                    <div className={styles.profiles}></div>
                    <div className={styles.chattingroom}>
                        <div className={styles.chattingroom_title}>
                            <div className={styles.chattingroom_title_font}>{ currentCR.chatId }</div>
                        </div>
                        {/* <label className={`${styles.chattingroom_menu_button}`} htmlFor="menu" onClick={ () => setIsOpen( prev => !prev ) }>
                            <img className={styles.chattingroom_menu_button_img} src="./src/assets/Chattingroommenu.svg" />
                        </label> */}
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
                        <div className={styles.chatting}>
                            <ul>
                                {/* { chatLog } */}
                                { currentCR.chatLogList }
                            </ul>
                        </div>
                        <div className={styles.line2}></div>
                        {/* <div className={`${styles.input_container}`}>
							<div className="input-group">
								<input type="text" placeholder="" className={`${styles.input}`} value={chat} onChange={onChange} />
								<img className={styles.send_container} src="./src/assets/Mesage_send.svg" onClick={onAddButton} ></img>
							</div>
						</div> */}
                        { viewInput() }
                    </div>
                </div>
            </div>
		</div>
	)
}

export default Chatting;
