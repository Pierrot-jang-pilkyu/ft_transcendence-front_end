import React, { useRef, useEffect } from 'react';

function Canvas() {
	const canvasRef = useRef(null);
		
	useEffect(() => {
		const canvas = canvasRef.current;
		canvas.width = 600;
		canvas.height = 400;

		const context = canvas.getContext("2d");

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
			x : 0,
			y : canvas.height/2 - 50,
			width : 10,
			height : 100,
			color : "white",
			score : 0
		}
		
		const com = {
			x : canvas.width - 10,
			y : canvas.height/2 - 50,
			width : 10,
			height : 100,
			color : "white",
			score : 0
		}
		
		const ball = {
			x : canvas.width/2,
			y : canvas.height/2,
			radius : 10,
			speed : 20,
			vX : 10,
			vY : 10,
			color : "white"
		}
		
		function isHitByWall() {
			return ball.y + ball.radius > canvas.height
				|| ball.y - ball.radius < 0
		}
		function isHitBy(player) {
			return ball.right > player.left
				&& ball.left < player.right
				&& ball.top < player.bottom
				&& ball.bottom > player.top
		}
		
		function updateBall() { 
			ball.x += ball.vX;
			ball.y += ball.vY;
			ball.top = ball.y - ball.radius;
			ball.bottom = ball.y + ball.radius;
			ball.left = ball.x - ball.radius;
			ball.right = ball.x + ball.radius;
		
			const player = (ball.x < canvas.width/2) ? user : com;
			if (isHitByWall())
				ball.vY *= -1;
			if (isHitBy(player))
			{
				const fPoint = ball.y - (user.y + user.height/2); 
				const angle = (fPoint / user.height/2) * Math.PI / 4;
		
				ball.vX = ball.speed * Math.cos(angle);
				if (ball.x > canvas.width/2)
					ball.vX *= -1;
				ball.vY = ball.speed * Math.sin(angle);
				ball.speed += 0.2;
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
			updatePlayer(com);
			moveCom();
		}
		
		function moveUser(event) {
			const rect = canvas.getBoundingClientRect();
			user.y = event.clientY - rect.top;
		}
		
		function moveCom() {
			const computerLevel = 0.1;
			com.y += (ball.y - (com.y + com.height/2)) * computerLevel;
		}
		
		function render() {
			drawRect(0, 0, canvas.width, canvas.height, "black");
			drawRect(user.x, user.y, user.width, user.height, user.color);
			drawRect(com.x, com.y, com.width, com.height, com.color);
			drawCircle(ball.x, ball.y, ball.radius, ball.color);
		}
		
		function game() {
			update();
			render();
		}
		
		setInterval(game, 50);
		canvas.addEventListener("mousemove", moveUser);
	}, []);
	return (
		<canvas ref={canvasRef}></canvas>
	);

}

export default Canvas;
