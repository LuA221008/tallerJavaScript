const canvas = document.getElementById('canvas');
const WIDTH = 800;
const HEIGHT = 500;
canvas.width = WIDTH;
canvas.height = HEIGHT;
canvas.style.background = '#ddd';
const context = canvas.getContext('2d');

var keydowns = {};
var playerScore = 0;
var computerScore = 0;
var player = new Player();
var computer = new Computer();
var ball = new Ball(WIDTH / 2 + 10, HEIGHT / 2);

document.addEventListener('keydown', function (event) {
    keydowns[event.code] = true;
})

document.addEventListener('keyup', function (event) {
    delete keydowns[event.code];
})

let render = function () {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    player.render();
    computer.render();
    ball.render();
    drawText(playerScore, canvas.width / 2, canvas.height - 60);
    drawText(computerScore, canvas.width / 2, canvas.height / 5);
}

let update = function () {
    player.update();
    computer.update(ball);
    ball.update(player.paddle, computer.paddle);
}

function Player() {
    this.paddle = new Paddle(WIDTH / 2 - 30, HEIGHT - 20, 80, 20);
}

Player.prototype.render = function () {
    this.paddle.render();
}

// Permite movimiento de la raqueta a través de las teclas del usuario
Player.prototype.update = function () {
    for (let key in keydowns) {
        if (key == "ArrowLeft") {
            this.paddle.move(-5, HEIGHT - 20);
        } else if (key == "ArrowRight") {
            this.paddle.move(4, HEIGHT - 20);
        } else {
            this.paddle.move(0, HEIGHT - 20);
        }
    }
}
function Computer() {
    this.paddle = new Paddle(WIDTH / 2 - 30, 0, 80, 20);
}

Computer.prototype.render = function () {
    this.paddle.render();
}

//Función que se usa para seguir el movimiento de la pelota con la raqueta 
Computer.prototype.update = function (ball) {
    var diff = -((this.paddle.x + (this.paddle.width / 2) - ball.x));
    if (diff < 0 && diff < -4) {
        diff = -5;
    } else if (diff > 0 && diff > 4) {
        diff = 5;
    }
    this.paddle.move(diff, 0);
    if (this.paddle.x < 0) {
        this.paddle = 0;
    } else if (this.x + this.width > WIDTH) {
        this.x = WIDTH - this.width;
    }
};


