import React, { useRef, useEffect, useState } from 'react';
import styles from "./Canvas.module.css"
import socket from '../../Socket';

function Canvas(props) {
	const canvasRef = useRef(null);
	
	useEffect(() => {
		console.log(props)
		socket.on("PONG", (data) => {
			tmp_ball.x = data.ball.x;
			tmp_ball.y = data.ball.y;
			tmp_user.y = props.isLeft == true ? data.left : data.right;
			tmp_com.y = props.isLeft == false ? data.left : data.right;
		});

		socket.on("VECTOR", (data) => {
			ball.x = data.x;
			ball.y = data.y;
			ball.vX = data.xv;
			ball.vY = data.yv;
		});

		socket.on("RECONNECT", () => {
			socket.emit("HIT", { roomId: props.roomId, x: ball.x, y: ball.y, xv: ball.vX, yv: ball.vY });
		})

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

		const barSizeRatio = props.options.barSize / 5;
		const ballSizeRatio = props.options.ballSize / 5;
		const speedRatio = props.options.speed / 10;

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
			x : props.isLeft == true ? 40 : width - 16 - 40,
			y : height/2 - 70,
			width : 16,
			height : 140 * barSizeRatio,
			color : props.isLeft == true ? "#397DFF" : "#FFB359",
			score : 0
		}

		const ball = {
			x : width/2,
			y : height/2,
			radius : 10 * ballSizeRatio,
			speed : 20 * speedRatio,
			// vX : 10 * speedRatio * Math.cos(45),
			// vY : 10 * speedRatio * Math.sin(45),
			vX : 10,
			vY : 1,
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
			x : props.isLeft == false ? 40 : width - 16 - 40,
			y : height/2 - 70,
			color : props.isLeft == false ? "#397DFF" : "#FFB359",
			score : 0
		}

		const tmp_user = {
			x : props.isLeft == true ? 40 : width - 16 - 40,
			y : height/2 - 70,
			width : 16,
			height : 140 * barSizeRatio,
			color : props.isLeft == true ? "#397DFF" : "#FFB359",
			score : 0
		}


		function isHitByWall() {
			return ball.y + ball.radius > height
				|| ball.y - ball.radius < 0
		}

		function isOut() {
			// if (ball.x < 0)
			// 	com.score++;
			// else if (ball.x > width)
			// 	user.score++;
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
			else if (((props.isLeft == true && ball.x < width/2) || (props.isLeft == false && ball.x > width/2))
				&& isHitBy(player))
			{
				const fPoint = ball.y - (player.y + player.height/2); 
				const angle = (fPoint / player.height/2) * Math.PI / 1.5;

				ball.vX = ball.speed * Math.cos(angle);
				if (ball.x > width/2)
					ball.vX *= -1;
				ball.vY = ball.speed * Math.sin(angle);
				socket.emit("HIT", { roomId: props.roomId, x: ball.x, y: ball.y, xv: ball.vX, yv: ball.vY });
			}
			else if (isOut())
			{
				ball.x = width/2;
				ball.y = height/2;
				ball.pause = 100;
				ball.vX = 10;
				ball.vY = 1;
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
			// context.fillText(user.score, width/4, height/4);
			// context.fillText(com.score, width/4 * 3 - 50, height/4);
			drawRect(0, height/2 - 1, width, 2, "#FFFFFF");
			drawRect(tmp_user.x, tmp_user.y, tmp_user.width, tmp_user.height, tmp_user.color);
			drawRect(tmp_com.x, tmp_com.y, tmp_user.width, tmp_user.height, tmp_com.color);
			drawCircle(tmp_ball.x, tmp_ball.y, ball.radius, ball.color);
		}

		// function end() {
		// 	context.font = 	"bold 150px sans-serif";
		// 	context.clearRect(0, 0, width, height)
		// 	context.fillText(user.score, width/4, height/3);
		// 	context.fillText(com.score, width/4 * 3 - 150, height/3);
		// }

		function game() {
			update();
			// if (user.score < 11 && com.score < 11)
			// {
			socket.emit("PING", { roomId: props.roomId, ball: { x: ball.x, y: ball.y }, bar: user.y, isLeft: props.isLeft });
			render();
			requestAnimationFrame(game);
			// }
			// else
			// 	end();
		}

		function onVisiblityChange() {
			if (document.visibilityState == 'visible')
				socket.emit("RECONNECT", { roomId: props.roomId });
		}

		requestAnimationFrame(game);
		canvas.addEventListener("mousemove", moveUser);
		document.addEventListener("visibilitychange", onVisiblityChange);

		return (()=>{
			document.removeEventListener("visibilitychange", onVisiblityChange);
		})
	}, []);

	return (
		<canvas className={`${styles.canvas}`} ref={canvasRef}></canvas>
	);
}

export default Canvas;
