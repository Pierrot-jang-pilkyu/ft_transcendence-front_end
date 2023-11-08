import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from "react";
import axios from 'axios'

function Loading()
{
	const navigate = useNavigate();


	const code = new URL(window.location.href).searchParams.get('code');
    const [qr, setQr] = useState();
	const [text, setText] = useState();


	function onChangeText (event) {
		setText(event.target.value);
	}

	function onClick () {
		axios.defaults.withCredentials = true;
		axios.post('http://localhost:3000/auth/2fa', {
			code: text,
		})
		.then((res)=> {navigate('/Lobby')})
		.catch((error)=>{console.log(error);})
	}


	useEffect(() => {
		axios.defaults.withCredentials = true;
		axios.post('http://localhost:3000/auth/login', {
			code: code,
		})
		.then((res)=> {
			fetch('http://localhost:3000/auth/2fa/generate', {
				method : "POST",
				credentials: "include",
			})
			.then((response) => {
				const reader = response.body.getReader();
			    return new ReadableStream({
					start(controller) {
						return pump();
						function pump() {
							return reader.read().then(({ done, value }) => {
								if (done) {
									controller.close();
									return;
								}
								controller.enqueue(value);
								return pump();
							});
						}
					},
				});
			})
			.then((stream) => new Response(stream))
			.then((response) => response.blob())
			.then((blob) => URL.createObjectURL(blob))
			.then((url) => setQr(url))
			.catch((err) => console.error(err));
		})
		.catch((error)=>{console.log(error);})
	}, []);

	return (
		<div>
			<img src={qr} />
			<input onChange = {onChangeText}/>
			<button onClick = {onClick}/>
		</div>
	);
}

export default Loading;
