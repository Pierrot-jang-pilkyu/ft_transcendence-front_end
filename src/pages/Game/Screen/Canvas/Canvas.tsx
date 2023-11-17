import React, { useRef, useEffect, useState } from 'react';
import styles from "./Canvas.module.css"
import io from "socket.io-client"

const socket = io("http://localhost:3131");

function Canvas(props) {
	const canvasRef = useRef(null);
	const [userId, setUserId] = useState(null);

	function enter() {
		console.log(socket.emit('JOIN', { userId: userId, channelId: 100005 }));
	}

		// 
	useEffect(() => {
		socket.on("PONG", (data) => {
			console.log(data);
			tmp_ball.x = data.ball.x;
			tmp_ball.y = data.ball.y;
			tmp_user.y = data.left;
			tmp_com.y = data.right;
		});
		const canvas = canvasRef.current;
		const width = 800; //1410
		const height = 700;
		// 디스플레이 크기 설정 (css 픽셀)
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;

		// 메모리에 실제 크기 설정 (픽셀 밀도를 고려하여 크기 조정)
		const dpr = window.devicePixelRatio;

		canvas.width =  width * dpr;
		canvas.height = height * dpr;

		// CSS에서 설정한 크기와 맞춰주기 위한 scale 조정

		const context = canvas.getContext("2d");
		context.scale(dpr, dpr);
		context.font = 	"bold 50px sans-serif";

		const barSizeRatio = props.options.barSize / 5;
		const ballSizeRatio = props.options.ballSize / 5;
		const speedRatio = props.options.speed / 5;

		function drawRect(x, y, w, h, color) {
			context.fillStyle = color;
			context.fillRect(x, y, w, h);
		}

		function drawCircle(x, y, r, color) {
			context.fillStyle = color;
			context.beginPath();
			context.arc(x, y, r, 0, Math.PI*2, false);
			context.closePath();
			context.fill();
		}

		const user = {
			x : 40,
			y : canvas.height/2 - 70,
			width : 16,
			height : 140 * barSizeRatio,
			color : "#397DFF",
			score : 0
		}

		const com = {
			width : 16,
			height : 140 * barSizeRatio,
			x : width - 16 - 40,
			y : height/2 - 70,
			color : "#FFB359",
			score : 0
		}

		const ball = {
			x : width/2,
			y : height/2,
			radius : 10 * ballSizeRatio,
			speed : 20 * speedRatio,
			vX : 10 * speedRatio * Math.cos(45),
			vY : 10 * speedRatio * Math.sin(45),
			color : "white",
			pause: 100,
		}

		const tmp_ball = {
			x : 0,
			y : 0,
		}

		const tmp_com = {
			width : 16,
			height : 140 * barSizeRatio,
			x : width - 16 - 40,
			y : height/2 - 70,
			color : "#FFB359",
			score : 0
		}

		const tmp_user = {
			x : 40,
			y : canvas.height/2 - 70,
			width : 16,
			height : 140 * barSizeRatio,
			color : "#397DFF",
			score : 0
		}


		function isHitByWall() {
			return ball.y + ball.radius > height
				|| ball.y - ball.radius < 0
		}

		function isOut() {
			if (ball.x < 0)
				com.score++;
			else if (ball.x > width)
				user.score++;
			return ball.x < 0
				|| ball.x > width
		}

		function isHitBy(player) {
			return ball.right > player.left
				&& ball.left < player.right
				&& ball.top < player.bottom
				&& ball.bottom > player.top
		}

		function updateBall() { 
			if (ball.pause-- > 0)
				return ;
			ball.x += ball.vX;
			ball.y += ball.vY;
			ball.top = ball.y - ball.radius;
			ball.bottom = ball.y + ball.radius;
			ball.left = ball.x - ball.radius;
			ball.right = ball.x + ball.radius;

			const player = (ball.x < width/2) ? user : com;
			if (isHitByWall())
				ball.vY *= -1;
			else if (isHitBy(player))
			{
				const fPoint = ball.y - (player.y + player.height/2); 
				const angle = (fPoint / player.height/2) * Math.PI / 1.5;

				ball.vX = ball.speed * Math.cos(angle);
				if (ball.x > width/2)
					ball.vX *= -1;
				ball.vY = ball.speed * Math.sin(angle);
				ball.speed += 0.01;
			}
			else if (isOut())
			{
				ball.x = width/2;
				ball.y = height/2;
				ball.pause = 100;
				render();
			}
		}

		function updatePlayer(p) {
			p.top = p.y;
			p.bottom = p.y + p.height;
			p.left = p.x;
			p.right = p.x + p.width;
		}

		function update() {
			updateBall();
			updatePlayer(tmp_user);
			updatePlayer(tmp_com);
			moveCom();
		}

		function moveUser(event) {
			const rect = canvas.getBoundingClientRect();
			user.y = event.clientY - rect.top - 70;
		}

		function moveCom() {
			const computerLevel = 0.4;
			com.y += (ball.y - (com.y + com.height/2)) * computerLevel;
		}

		function render() {
			context.clearRect(0, 0, width, height)
			// context.fillText(user.score, width/4, height/4);
			// context.fillText(com.score, width/4 * 3 - 50, height/4);
			drawRect(0, height/2 - 1, width, 2, "#FFFFFF");
			drawRect(tmp_user.x, tmp_user.y, user.width, user.height, user.color);
			drawRect(tmp_com.x, tmp_com.y, com.width, com.height, com.color);
			drawCircle(tmp_ball.x, tmp_ball.y, ball.radius, ball.color);
		}

		function end() {
			context.font = 	"bold 150px sans-serif";
			context.clearRect(0, 0, width, height)
			context.fillText(user.score, width/4, height/3);
			context.fillText(com.score, width/4 * 3 - 150, height/3);
		}

		function game() {
			update();
			// if (user.score < 11 && com.score < 11)
			// {
			socket.emit("PING", { channelId: 100005 , game: { ball: { x: ball.x, y: ball.y }, right: com.y, left: user.y }});
			render();
			 requestAnimationFrame(game);
			// }
			// else
			// 	end();
		}

		requestAnimationFrame(game);
		canvas.addEventListener("mousemove", moveUser);
	}, []);
	function onClick1()
	{
		setUserId(1);
	}
	function onClick2()
	{
		setUserId(2);
	}
	function onEnter()
	{
		enter();
	}

	function onOn()
	{

	}

	return (
		<div>
			<canvas className={`${styles.canvas}`} ref={canvasRef}></canvas>
			<div>
				<button onClick={onOn}>socketOn</button>
				<button onClick={onClick1}>1</button>
				<button onClick={onClick2}>2</button>
				<button onClick={onEnter}>enter</button>
			</div>
		</div>
	);
}

export default Canvas;