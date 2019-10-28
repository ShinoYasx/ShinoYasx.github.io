var BG = document.getElementById('boardgame');
var ctx = BG.getContext('2d');
var score;
var direction;
var start;
var x, y;
var gameI;
var bPlaying = false;
var button_start = document.getElementById('button_start');
var snake = {
    x: 0,
    y: 0,
    body: [
        {
            x,
            y
        }
    ]
}

function scoreInc() {
    document.getElementById("score").innerHTML = ++score;
}

function drawPixel(x, y, color) {
    ctx.beginPath()
    ctx.fillStyle = color || '#000000';
    ctx.fillRect(x * 10, y * 10, 10, 10);
    ctx.closePath();
}

function newPos(x, y) {
    if (direction == 0)
        x += 1;
    if (direction == 1)
        y += 1;
    if (direction == 2)
        x -= 1;
    if (direction == 3)
        y -= 1;
    return { x: x, y: y }
}

function rndApple() {
    let x = Math.floor(Math.random() * 20);
    let y = Math.floor(Math.random() * 20);
    return { x: x, y: y }
}

function gameOver() {
    clearInterval(gameI);
    bPlaying = false;
    button_start.firstChild.data = 'Restart (space)'
    ctx.beginPath();
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game over !', BG.width / 2, BG.height / 2)
}

function game() {
    if (start) {
        apple = rndApple();
        start = false;
    }
    // ctx.clearRect(0, 0, BG.width, BG.height);

    pos = newPos(x, y);
    x = pos.x;
    y = pos.y;

    if (x == apple.x && y == apple.y) {
        apple = rndApple();
        drawPixel(apple.x, apple.y, 'red');
        scoreInc();
    }
    drawPixel(apple.x, apple.y, 'red');
    drawPixel(x, y);

    if (x >= 20 || x < 0 || y >= 20 || y < 0) {
        gameOver();
    }
}

function restart() {
    clearInterval(gameI);
    button_start.firstChild.data = 'Restart'

    bPlaying = true;
    start = true;

    document.getElementById("score").innerHTML = score = 0;
    direction = 0;
    x = BG.width / 20, y = BG.height / 20;

    gameI = setInterval(game, 100);
}

document.addEventListener('keydown', (ev) => {
    if (ev.code === "ArrowRight")
        direction = 0;
    if (ev.code === "ArrowDown")
        direction = 1;
    if (ev.code === "ArrowLeft")
        direction = 2;
    if (ev.code === "ArrowUp")
        direction = 3;
    if (ev.code === "Space" && !bPlaying)
        restart();
});
