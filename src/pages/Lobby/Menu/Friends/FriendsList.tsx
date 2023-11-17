import styles from "./FriendsList.module.css";
import Avatar from './Avatar';
import { useState } from "react";
import SearchFriends from "../../../../assets/SearchFriends.svg";
import FriendsArrow from "../../../../assets/FriendsArrow.svg";
import FriendsAdd from "../../../../assets/FriendsAdd.svg";


function FriendsList(props)
{
    const [nick, setNick] = useState('');
	const avatars:any = [];

    const changeAvatar = () => {
		for (let i = 0; i < props.friendObjects.length; ++i)
		{
			avatars.push(<li><Avatar name={props.friendObjects[i].name} img={props.friendObjects[i].img} state={props.friendObjects[i].state} /></li>);
			// console.log('name: ' + props.friendObjects[i].name + ', img_src: ' + props.friendObjects[i].img);
		}
	};
		
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
			alert("warning");
			return '';
		}
		// 백엔드 
	};

    return (
        <div className="drawer drawer-end">
           	<input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content">
				{/* Page content here */}
				<label htmlFor="my-drawer-4" className={`${styles.button} ${styles.friend} ${styles.friend_font}` }>
					<img className={styles.friend_img} src={SearchFriends}></img>
					<div className={`${styles.friend_font}`}>Search Friends</div>
					<img src={FriendsArrow}></img>
				</label>
			</div> 
			<div className="drawer-side">
				<label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
				<div className={styles.fl_background}>
						<div className={styles.friend_list} >
							<ul className="menu p-4 w-80 min-h-full bg-gray-200 text-base-content">
								{/* Sidebar content here */}
								{/* <li><Avatar name="James Dinn" /></li> */}
								{changeAvatar()}
								{avatars}
							</ul>
						</div>
						<div className={`${styles.input_container}`}>
							<div className="input-group">
								<input type="text" placeholder="Search…" className={`${styles.input}`} value={nick} onChange={onChange} />
								<img className={styles.add_container} src={FriendsAdd} onClick={onAddButton} ></img>
							</div>
						</div>
				</div>
			</div>
		</div>
    )
}

export default FriendsList;