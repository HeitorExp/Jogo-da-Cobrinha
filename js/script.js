const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");
const box = 32;
const snake = [{ x: 8 * box, y: 8 * box }];
let direction = "right";
let food = getRandomFoodPosition();

function getRandomFoodPosition() {
    return {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box,
    };
}

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    snake.forEach(segment => {
        context.fillStyle = "green";
        context.fillRect(segment.x, segment.y, box, box);
    });
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function update(event) {
    const keyMap = {
        37: "left",
        38: "up",
        39: "right",
        40: "down",
    };

    const oppositeDirection = {
        left: "right",
        right: "left",
        up: "down",
        down: "up",
    };

    if (keyMap[event.keyCode] && keyMap[event.keyCode] !== oppositeDirection[direction]) {
        direction = keyMap[event.keyCode];
    }
}

document.addEventListener("keydown", update);

function iniciarJogo() {
    if (isOutOfBounds(snake[0])) {
        handleOutOfBounds();
    }

    if (isCollidingWithSelf()) {
        clearInterval(gameInterval);
        alert("Game Over :(");
    }

    criarBG();
    criarCobrinha();
    drawFood();

    const { x: newX, y: newY } = getNextHeadPosition();

    if (newX !== food.x || newY !== food.y) {
        snake.pop();
    } else {
        food = getRandomFoodPosition();
    }

    const newHead = { x: newX, y: newY };
    snake.unshift(newHead);
}

function isOutOfBounds(segment) {
    return segment.x > 15 * box || segment.x < 0 || segment.y > 15 * box || segment.y < 0;
}

function handleOutOfBounds() {
    if (direction === "right") snake[0].x = 0;
    if (direction === "left") snake[0].x = 16 * box;
    if (direction === "down") snake[0].y = 0;
    if (direction === "up") snake[0].y = 16 * box;
}

function isCollidingWithSelf() {
    return snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y);
}

function getNextHeadPosition() {
    let newX = snake[0].x;
    let newY = snake[0].y;

    if (direction === "right") newX += box;
    if (direction === "left") newX -= box;
    if (direction === "up") newY -= box;
    if (direction === "down") newY += box;

    return { x: newX, y: newY };
}

const gameInterval = setInterval(iniciarJogo, 100);
