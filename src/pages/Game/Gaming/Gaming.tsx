import React, { useRef, useEffect, useState, useContext } from 'react';
import styles from "./Gaming.module.css"
import { GameContext, socket } from '../Utils';
import { useNavigate } from 'react-router-dom';

function Gaming() {
	const canvasRef = useRef(null);
	const [end, setEnd] = useState(0);
	const navigate = useNavigate();
	const [game, setGame] = useContext(GameContext);
	const roomId = game.room.roomId;
	const option = game.room.option;
	const isLeft = game.isLeft;

	useEffect(() => {
		let turn = 1;
		const canvas = canvasRef.current;
		const width = 800;
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

		const barSizeRatio = option.barSize / 5;
		const ballSizeRatio = option.ballSize / 5;
		const speedRatio = option.speed / 10;

		function right() {
			return isLeft == true ? tmp_com.y : tmp_user.y
		}

		function left() {
			return isLeft == true ? tmp_com.y : tmp_user.y
		}

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
			x : isLeft == true ? 40 : width - 16 - 40,
			y : height/2 - 70,
			width : 16,
			height : 140 * barSizeRatio,
			color : isLeft == true ? "#397DFF" : "#FFB359",
		}

		const ball = {
			x : width/2,
			y : height/2,
			radius : 10 * ballSizeRatio,
			speed : 20 * speedRatio,
			// vX : 10 * speedRatio * Math.cos(45),
			// vY : 10 * speedRatio * Math.sin(45),
			vX : 20 * speedRatio,
			vY : 0,
			color : "white",
			pause: 100,
		}

		const tmp_ball = {
			x : width/2,
			y : height/2,
		}

		const tmp_com = {
			width : 16,
			height : 140 * barSizeRatio,
			x : isLeft == false ? 40 : width - 16 - 40,
			y : height/2 - 70,
			color : isLeft == false ? "#397DFF" : "#FFB359",
		}

		const tmp_user = {
			x : isLeft == true ? 40 : width - 16 - 40,
			y : height/2 - 70,
			width : 16,
			height : 140 * barSizeRatio,
			color : isLeft == true ? "#397DFF" : "#FFB359",
		}

		const score = {
			left: 0,
			right: 0,
		}

		function isHitByWall() {
			return ball.y + ball.radius > height
				|| ball.y - ball.radius < 0
		}

		function isOut() {
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

			const player = user;
			if (isHitByWall())
				ball.vY *= -1;
			else if (((isLeft == true && ball.x < width/2) || (isLeft == false && ball.x > width/2))
				&& isHitBy(player))
			{
				const fPoint = ball.y - (player.y + player.height/2); 
				const angle = (fPoint / player.height/2) * Math.PI / 1.5;

				ball.vX = ball.speed * Math.cos(angle);
				if (ball.x > width/2)
					ball.vX *= -1;
				ball.vY = ball.speed * Math.sin(angle);
				socket.emit("HIT", { x: ball.x, y: ball.y, xv: ball.vX, yv: ball.vY });
			}
			else if (isOut())
			{
				if ((isLeft == true && ball.x > width) || (isLeft == false && ball.x < 0))
					socket.emit("SCORE", { roomId: roomId, isLeft: isLeft });
				ball.x = width/2;
				ball.y = height/2;
				ball.pause = 100;
				turn *= -1;
				ball.vX = 20 * speedRatio * turn;
				ball.vY = 0;
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
			updatePlayer(user);
		}

		function moveUser(event) {
			const rect = canvas.getBoundingClientRect();
			user.y = event.clientY - rect.top - 70;
		}


		function render() {
			context.clearRect(0, 0, width, height)
			context.fillText(score.left, width/4, height/4);
			context.fillText(score.right, width/4 * 3 - 50, height/4);
			drawRect(0, height/2 - 1, width, 2, "#FFFFFF");
			drawRect(tmp_user.x, tmp_user.y, tmp_user.width, tmp_user.height, tmp_user.color);
			drawRect(tmp_com.x, tmp_com.y, tmp_user.width, tmp_user.height, tmp_com.color);
			drawCircle(tmp_ball.x, tmp_ball.y, ball.radius, ball.color);
		}

		function renderPause()
		{
			context.fillStyle = "rgba(255, 255, 255, 0.6)";
			context.fillRect(0, 0, width, height);
		}

		function game() {
			update();
			socket.emit("PING", { roomId: roomId, ball: { x: ball.x, y: ball.y }, bar: user.y, isLeft: isLeft });
			render();
			rafId = requestAnimationFrame(game);
		}

		function onVisiblityChange() {
			if (document.visibilityState == 'visible')
				socket.emit("RESUME");
			else
				socket.emit("PAUSE");
		}

		//main
		let rafId = requestAnimationFrame(game);
		canvas.addEventListener("mousemove", moveUser);
		document.addEventListener("visibilitychange", onVisiblityChange);

		//socket_on
		socket.on("PONG", (data) => {
			tmp_ball.x = data.ball.x;
			tmp_ball.y = data.ball.y;
			tmp_user.y = isLeft == true ? data.left : data.right;
			tmp_com.y = isLeft == false ? data.left : data.right;
		});

		socket.on("VECTOR", (data) => {
			ball.x = data.x;
			ball.y = data.y;
			ball.vX = data.xv;
			ball.vY = data.yv;
		});

		socket.on("SCORE", (data) => {
			score.left = data.left;
			score.right = data.right;
		})

		socket.on("END", (data) => {
			cancelAnimationFrame(rafId);
			if (data.winnerIsLeft === isLeft)
				setEnd(1);
			else
				setEnd(2);
		})

		socket.on("PAUSE", () => {
			cancelAnimationFrame(rafId);
			renderPause();
			socket.emit("SAVE", { ball: { x: ball.x, y: ball.y, xv: ball.vX, yv: ball.vY}, right: isLeft == true ? tmp_com.y : tmp_user.y, left: isLeft == true ? tmp_user.y : tmp_com.y });
		})
		
		socket.on("RESUME", async (data) => {
			await (function () {
				ball.x = data.ball.x;
				ball.y = data.ball.y;
				ball.vX = data.ball.xv;
				ball.vY = data.ball.yv;
				tmp_ball.x = data.ball.x;
				tmp_ball.y = data.ball.y;
				tmp_user.y = isLeft == true ? data.left : data.right;
				tmp_com.y = isLeft == false ? data.left : data.right;
			})
			rafId = requestAnimationFrame(game);
		})
		return (()=>{
			document.removeEventListener("visibilitychange", onVisiblityChange);
		})
	}, []);

	function clickButton() {
		navigate("/Lobby");
	}

	return (
		<div>
			{ !end && <canvas className={`${styles.canvas}`} ref={canvasRef}></canvas> }
			{ end == 1 && <div className={`${styles.end}`}>Win</div>}
			{ end == 2 && <div className={`${styles.end}`}>Lose</div>}
			{ end != 0 && <button>lobby</button>}
		</div>
	);
}

export default Gaming;
