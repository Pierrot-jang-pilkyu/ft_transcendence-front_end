import Header from "../../components/Header";
import styles from "./Chatting.module.css";
import Outside from "./Outside";
import { useEffect, useState } from "react";

function Chatting (props:any) {

    const [isOpen, setIsOpen] = useState(true);

    useEffect( () => {

        const closeDropdown = (e:any) => {
            console.log(e);
            setIsOpen(false);
        }

        document.body.addEventListener('click', closeDropdown);

        return () => document.body.addEventListener('click', closeDropdown);

    }, []);

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
                            <li><div className={styles.chatlist_font}>1</div></li>
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
                    <div className={styles.profiles}></div>
                    <div className={styles.chattingroom}>
                        <div className={styles.chattingroom_title}>
                            <div className={styles.chattingroom_title_font}>Chatting Room</div>
                        </div>
                        <label className={`${styles.chattingroom_menu_button}`} htmlFor="menu" onClick={ () => setIsOpen( prev => !prev ) }>
                            <img className={styles.chattingroom_menu_button_img} src="./src/assets/Chattingroommenu.svg" />
                        </label>
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
                                <li><div className={styles.dmlist_font}>1</div></li>
                            </ul>
                        </div>
                        <div className={styles.line2}></div>
                    </div>
                </div>
            </div>
		</div>
	)
}

export default Chatting;
