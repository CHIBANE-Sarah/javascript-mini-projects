const canvas = document.getElementById("canvasGame");
const ctx = canvas.getContext("2d");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const restartBtn = document.getElementById("restartBtn");
const playAgainBtn = document.getElementById("playAgainBtn");

const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const gameOverScreen = document.getElementById("gameOver");
const finalScoreEl = document.getElementById("finalScore");

let gridSize;
let snake, dx, dy, foodX, foodY, score, speed, intervalId, isPaused = false;

let highScore = localStorage.getItem("highScore") || 0;
highScoreEl.textContent = `High Score: ${highScore}`;

function resizeCanvas() {
    const size = Math.min(window.innerWidth * 0.8, 400);
    canvas.width = size;
    canvas.height = size;
    gridSize = Math.floor(size / 20);
}
resizeCanvas();
window.addEventListener("resize", () => {
    resizeCanvas();
    if (!intervalId) drawGame();
});

function init() {
    resizeCanvas();
    snake = [{ x: gridSize * 10, y: gridSize * 10 }];
    dx = gridSize;
    dy = 0;
    score = 0;
    speed = 200;
    generateFood();
    updateScore();
    clearInterval(intervalId);
    intervalId = setInterval(gameLoop, speed);
    gameOverScreen.style.display = "none";
}

function generateFood() {
    const cells = canvas.width / gridSize;
    foodX = Math.floor(Math.random() * cells) * gridSize;
    foodY = Math.floor(Math.random() * cells) * gridSize;
}

function gameLoop() {
    if (isPaused) return;
    moveSnake();
    if (checkCollision()) return;
    drawGame();
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === foodX && head.y === foodY) {
        score++;
        updateScore();
        generateFood();
        increaseSpeed();
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        endGame();
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
            return true;
        }
    }
    return false;
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ff1744";
    ctx.beginPath();
    ctx.arc(foodX + gridSize/2, foodY + gridSize/2, gridSize/2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#76ff03";
    snake.forEach(segment => {
        ctx.beginPath();
        ctx.roundRect(segment.x, segment.y, gridSize, gridSize, 6);
        ctx.fill();
    });
}

function updateScore() {
    scoreEl.textContent = `Score: ${score}`;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreEl.textContent = `High Score: ${highScore}`;
    }
}

function increaseSpeed() {
    if (speed > 80) {
        speed -= 5;
        clearInterval(intervalId);
        intervalId = setInterval(gameLoop, speed);
    }
}

function endGame() {
    clearInterval(intervalId);
    finalScoreEl.textContent = score;
    gameOverScreen.style.display = "block";
}

document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -gridSize; }
    else if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = gridSize; }
    else if (e.key === "ArrowLeft" && dx === 0) { dx = -gridSize; dy = 0; }
    else if (e.key === "ArrowRight" && dx === 0) { dx = gridSize; dy = 0; }
});

startBtn.addEventListener("click", init);
pauseBtn.addEventListener("click", () => { isPaused = !isPaused; });
restartBtn.addEventListener("click", init);

