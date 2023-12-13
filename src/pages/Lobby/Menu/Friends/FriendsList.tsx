import styles from "./FriendsList.module.css";
import Avatar from './Avatar';
import { useState, useEffect, useContext, KeyboardEvent } from "react";
import SearchFriends from "../../../../assets/SearchFriends.svg";
import FriendsArrow from "../../../../assets/FriendsArrow.svg";
import FriendsAdd from "../../../../assets/FriendsAdd.svg";
import axios from 'axios';
import { IdContext } from "../../../../App";
import socket from "../../../../hooks/socket/socket";

interface Friend {
	name: string;
	img: string;
	state: string;
	id: string;
  }

function FriendsList(props:any)
{
    const [nick, setNick] = useState('');
	const [id, setId] = useContext(IdContext);
	const [fList, setFList] = useState<any>([]);
	const friendsList:Friend[] = [];
	const userId:number = id;

	const changeAvatar = () => {
		const res:any = [];

		for (let i = 0; i < friendsList.length; ++i)
		{
			res.push(<li><Avatar name={friendsList[i].name} img={friendsList[i].img} state={friendsList[i].state} id={friendsList[i].id} /></li>);
			// console.log('name: ' + friendsList[i].name + ', img_src: ' + friendsList[i].img);
		}

		return res;
	};

	useEffect(() => {
		function onInfoFriends(responseData:any) {
			console.log("INFO_FRIENDS");
			console.log(responseData);

			friendsList.splice(0, friendsList.length);

			for (let i = 0; i < responseData.length; ++i) 
			{
				friendsList.push({ name: responseData[i].friend.name, img: responseData[i].friend.avatar, state: responseData[i].friend.status, id: responseData[i].friend.id });
			}

			setFList(changeAvatar());
		};

		socket.on("INFO_FRIENDS", onInfoFriends);
		
		return (() => {
			socket.off("INFO_FRIENDS", onInfoFriends);
		})
	}, [])

	useEffect(() => {
		axios.get(`http://localhost:3000/users/friends/${id}`)
            .then((Response) => {
                console.log("friends list");
                console.log(Response.data);

				for (let i = 0; i < Response.data.length; ++i)
				{
					friendsList.push({ name: Response.data[i].friend.name, img: Response.data[i].friend.avatar, state: Response.data[i].friend.status, id: Response.data[i].friend.id });
				}

				setFList(changeAvatar());
            })
            .catch((Error)=>{console.log(Error)})
	}, [id]);

	// const addFriendList = (nickName:any, img:any, state:any) => {
	// 	avatars.push(<li><Avatar name={nickName} img={img} state={state}/></li>);
	// };

	const onChange = (e:any) => {
		setNick(e.target.value);
		// test();
	};

	const onAddButton = () => {
		setNick('');
		if (nick === '')
		{
			return '';
		}

		socket.emit("REQUEST_FRIEND", { userId: userId, target: nick });
	};

	const activeEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && e.nativeEvent.isComposing === false)
        {
            onAddButton();
        }
    }

    return (
        // <div className="drawer drawer-end">
        <div className={`${styles.drawer} ${styles["drawer-end"]}`}>
           	<input id="my-drawer-4" type="checkbox" className={`${styles["drawer-toggle"]}`} />
			<div className="drawer-content">
				{/* Page content here */}
				<label htmlFor="my-drawer-4" className={`${styles.button} ${styles.friend} ${styles.friend_font}` }>
					<img className={styles.friend_img} src={SearchFriends}></img>
					<div className={`${styles.friend_font}`}>Search Friends</div>
					<img src={FriendsArrow}></img>
				</label>
			</div> 
			<div className={`${styles["drawer-side"]}`}>
				<label htmlFor="my-drawer-4" aria-label="close sidebar" className={`${styles["drawer-overlay"]}`}></label>
				<div className={styles.fl_background}>
						<div className={styles.friend_list} >
							<ul className="menu p-4 w-80 min-h-full bg-gray-200 text-base-content">
								{/* Sidebar content here */}
								{ fList }
							</ul>
						</div>
						<div className={`${styles.input_container}`}>
							<div className="input-group">
								<input type="text" placeholder="Search…" className={`${styles.input}`} value={nick} onChange={onChange} onKeyDown={activeEnter} />
								<img className={styles.add_container} src={FriendsAdd} onClick={onAddButton} ></img>
							</div>
						</div>
				</div>
			</div>
		</div>
    )
}

export default FriendsList;