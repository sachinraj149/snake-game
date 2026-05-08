const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("scoreVal");

const box = 20;
let score = 0;
let d = ""; // Direction shuru mein khali rahegi

// Snake ko bilkul beech mein rakhein
let snake = [{ x: 10 * box, y: 10 * box }];

let food = {
    x: Math.floor(Math.random() * 18 + 1) * box,
    y: Math.floor(Math.random() * 18 + 1) * box
};

document.addEventListener("keydown", direction);

function direction(event) {
    if (event.keyCode === 37 && d !== "RIGHT") d = "LEFT";
    else if (event.keyCode === 38 && d !== "DOWN") d = "UP";
    else if (event.keyCode === 39 && d !== "LEFT") d = "RIGHT";
    else if (event.keyCode === 40 && d !== "UP") d = "DOWN";
}

window.setDir = function(newDir) {
    if (newDir === "LEFT" && d !== "RIGHT") d = "LEFT";
    if (newDir === "UP" && d !== "DOWN") d = "UP";
    if (newDir === "RIGHT" && d !== "LEFT") d = "RIGHT";
    if (newDir === "DOWN" && d !== "UP") d = "DOWN";
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) return true;
    }
    return false;
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "#00ff41" : "#008F11";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "#FF3131";
    ctx.fillRect(food.x, food.y, box, box);

    // Agar direction set nahi hai to snake move nahi karega
    if (d === "") return;

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d === "LEFT") snakeX -= box;
    if (d === "UP") snakeY -= box;
    if (d === "RIGHT") snakeX += box;
    if (d === "DOWN") snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        scoreElement.innerText = score;
        food = {
            x: Math.floor(Math.random() * 18 + 1) * box,
            y: Math.floor(Math.random() * 18 + 1) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    // Boundary check aur collision check
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert("Game Over! Score: " + score);
        location.reload();
        return;
    }

    snake.unshift(newHead);
}

let game = setInterval(draw, 150);