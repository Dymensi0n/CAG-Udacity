
// Variables ------------------------------

let game = true;
let playerScore = 0;
let playerLives = 3;

let lives = document.querySelector(".lives");
let score = document.querySelector(".score");

lives.textContent = `Lives: ${playerLives}`;
score.textContent = `Score: ${playerScore}`;

// Enemies our player must avoid
var Enemy = function Enemy(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = 100;
    this.collision = false;
};



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    //Moves Enemies and resets when raches end of canvas
    this.x += this.speed * dt;
    if (this.x > 707) {
        this.x = -100;
        var randomSpeed = Math.floor(Math.random() * 4 + 1);
        this.speed = 150 * randomSpeed;
    };
    var enemyLeftX = this.x - 60;
    var enemyRightX = this.x + 60;
    var enemyTopY = this.y - 60;
    var enemyBottomY = this.y + 60;


    if (player.x > enemyLeftX && player.x < enemyRightX && player.y > enemyTopY && player.y < enemyBottomY) {
      
        player.resetPosition();
        playerLives -= 1;
        console.log(playerLives);
        lives.textContent = `Lives: ${playerLives}`;

    };
};



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Player Images
var playerSelect = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];



// This class requires an update(), render() and
// a handleInput() method.

const Player = function Player(x, y, sprite) {
    this.sprite = playerSelect[(Math.floor(playerSelect.length * Math.random()))]; // Randomizes player selection
    this.x = x;
    this.y = y;
    this.h_step = 101;
    this.v_step = 83;
    console.log(this.sprite);
};



Player.prototype.update = function(dt) {

    if (game && player.y < 40) {
        game = false;
        player.resetPosition();
        score.textContent = `Score: ${(playerScore += 100)}`;
        console.log(`Game over: ${game} - Score: ${playerScore}`);
        playerWin();
    };

    if (playerLives <= 0) {
        gameOver();
    };

};



Player.prototype.resetPosition = function() {
    this.x = 303;
    this.y = 650;
};



Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(700, 60), new Enemy(700, 143), new Enemy(700, 226),
    new Enemy(700, 309), new Enemy(700, 392), new Enemy(700, 475),
    new Enemy(700, 558)];



// Place the player object in a variable called player
const player = new Player(303, 650);



Player.prototype.handleInput = function (movement) {

    const playerHorizontal = 101;
    const playerVertical = 83;

    if (movement === "left" && this.x - playerHorizontal >= 0) {
        this.x -= playerHorizontal;
    }else if (movement === "right" && this.x + playerHorizontal < ctx.canvas.width) {
        this.x += playerHorizontal;
    }else if (movement === "up" && this.y - playerVertical >= -83) {
        this.y -= playerVertical;
    }else if (movement === "down" && this.y + playerVertical < ctx.canvas.height -200) {
        this.y += playerVertical;
    };

    /* switch (dt) {
      case "up":
        this.y -= playerVertical;
        break;
      case "down":
        this.y += playerVertical;
        break;
      case "left":
        this.x -= playerHorizontal;
        break;
      case "right":
        this.x += playerHorizontal;
        break;
    } */
   };



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


const gemSet=[{name:'blue', image:'images/Gem blue.png', value: 50 },
              {name:'green', image:'images/Gem green.png', value: 25},
              {name:'orange', image:'images/Gem Orange.png', value: 100}];

const x_blocks=[101,505];

const y_blocks=[100,200];

const gems = function gems(props){

//to set gems randomly

    var g = gemSet[Math.floor(Math.random()* gemSet.length) ];

    this.name = g.name;

    this.image = g.image; this.value = g.value;

    this.x = x_blocks[Math.floor(Math.random()*x_blocks.length)];

    this.y = y_blocks[Math.floor(Math.random()*x_blocks.length)];

};


/* // Gem Spawn
const Gem = function Gem(x, y) {
    this.sprite = 'images/Gem Blue.png';
    this.x = x;
    this.y = y;
}; */



// Goal image and feature
/* gemSpawn.prototype.update = function(dt) {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
}; */



gems.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};



gems.prototype.collection = function() {

};



const createGem = new gems();

// Player Wins function

var winMsg = document.getElementById("wingame");
winMsg.style.display = "none";

function playerWin() {

    function displayWin() {
        if (winMsg.style.display === "none") {
          winMsg.style.display = "block";
        } else {
          winMsg.style.display = "none";
        }
      }

      displayWin();

    resetGame();

};

// Reset the game
function resetGame() {

    allEnemies = [];

};

function gameOver() {
    alert('You Lose!');
    playerLives = 3;
    lives.textContent = `Lives: ${playerLives}`;
}

