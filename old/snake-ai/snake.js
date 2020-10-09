var BG = document.getElementById('boardgame');
var ctx = BG.getContext('2d');
var score;
var direction;
var start;
var gameI;
var bPlaying = false;
var button_start = document.getElementById('button_start');
var snake;
var apple;

function scoreInc() {
    document.getElementById("score").innerHTML = ++score;
}

function drawPixel(x, y, color) {
    ctx.beginPath()
    ctx.fillStyle = color || '#000000';
    ctx.fillRect(x * 10, y * 10, 10, 10);
    ctx.closePath();
}

function clrQueue() {
    let f = snake.body.shift();
    ctx.clearRect(f.x * 10, f.y * 10, 10, 10);
}

function gameOver() {
    clearInterval(gameI);
    bPlaying = false;
    button_start.firstChild.data = 'Restart (space)'
    ctx.beginPath();
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFF00';
    ctx.fillText('Game over !', BG.width / 2, BG.height / 2);
    ctx.closePath();
}

function move() {
    snake.body.push({ x: snake.head.x, y: snake.head.y });
    if (snake.head.x == apple.x && snake.head.y == apple.y) {
        apple = rndApple();
        drawPixel(apple.x, apple.y, 'red');
        scoreInc();
    } else
        clrQueue();
    if (direction == 0 && snake.head.x + 1 < 20) {
        snake.head.x++;
    } else if (direction == 1 && snake.head.y + 1 < 20) {
        snake.head.y++;
    } else if (direction == 2 && snake.head.x - 1 >= 0) {
        snake.head.x--;
    } else if (direction == 3 && snake.head.y - 1 >= 0) {
        snake.head.y--;
    } else gameOver();
    snake.body.forEach(el => {
        if (snake.head.x == el.x && snake.head.y == el.y)
            gameOver();
    });
}

function rndApple() {
    let x = Math.floor(Math.random() * 20);
    let y = Math.floor(Math.random() * 20);
    snake.body.forEach(el => {
        if (x == el.x && y == el.y)
            return rndApple();
    })
    return { x: x, y: y }
}

function game() {
    if (start) {
        apple = rndApple();
        start = false;
    }

    move();

    drawPixel(apple.x, apple.y, 'red');
    drawPixel(snake.head.x, snake.head.y);
}

function restart() {
    clearInterval(gameI);
    button_start.firstChild.data = 'Restart';

    ctx.clearRect(0, 0, BG.width, BG.height);

    bPlaying = true;
    start = true;

    snake = {
        head: {},
        body: []
    };
    apple = {};

    document.getElementById("score").innerHTML = score = 0;
    direction = 0;
    snake.head.x = BG.width / 20, snake.head.y = BG.height / 20;

    gameI = setInterval(game, 100);
}

document.addEventListener('keydown', (ev) => {
    switch (ev.code) {
        case 'ArrowRight':
            if (!snake.body.length || direction != 2)
                direction = 0;
            break;
        case 'ArrowDown':
            if (!snake.body.length || direction != 3)
                direction = 1;
            break;
        case 'ArrowLeft':
            if (!snake.body.length || direction != 0)
                direction = 2;
            break;
        case 'ArrowUp':
            if (!snake.body.length || direction != 1)
                direction = 3;
            break;
        case 'Space':
            if (!bPlaying)
                restart();
            break;
        case 'Escape':
            if (bPlaying)
                gameOver();
            break;
    }
});
