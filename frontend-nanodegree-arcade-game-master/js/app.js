// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // generate random images
    var girlArray = ['images/char-cat-girl.png',
                      'images/char-horn-girl.png',
                      'images/char-pink-girl.png',
                      'images/char-princess-girl.png'] ;
    this.sprite = girlArray[Math.floor(Math.random() * girlArray.length)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // if girl come to end of canvas, get it back
    if (this.x >= 500) {
    this.x = -50;
}
    //have to check is there any accident
    this.collisionCheck(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
};

// Drawing the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Moving the player
Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        this.x -= this.speed;
    }
    if (keyPress == 'up') {
        this.y -= this.speed - 25; //slow down!
    }
    if (keyPress == 'right') {
        this.x += this.speed;
    }
    if (keyPress == 'down') {
        this.y += this.speed - 25; //slow down!
    }
};

var maxEnemies = 3;

Enemy.prototype.collisionCheck = function(enemy) {
    // check for collision between enemy and player
    if (
        player.y + 160 >= this.y + 90
        && player.x + 30 <= this.x + 90
        && player.y + 70 <= this.y + 140
        && player.x + 80 >= this.x + 10) {
        //accident! player will be returned to start now
        player.x = 200;
        player.y = 433;
    }
    if (player.y  <= 0) {
        //player escaped! will be returned to start now
        player.x = 200;
        player.y = 433;
        generateEnemies(Math.floor(Math.random() * maxEnemies) + 1);
    }
    // disable moving to white area
    if (player.y > 370 ) {
        player.y = 370;
    }
    if (player.x > 400) {
        player.x = 400;
    }
    if (player.x < 3) {
        player.x = 3;
    }
};

var generateEnemies = function(enemies) {
    // remove all enemies
    allEnemies.length = 0;
    // loading enemies
    for (var i = 0; i <= enemies; i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 100);
         for (var j = 0; j <= enemies; j++) {
        allEnemies.push(enemy);
		 }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(200, 433, 70);
var enemy = new Enemy(-50, Math.random() * 184 + 50, Math.random() * 100);
allEnemies.push(enemy);
// Start game with random number of girls on the canvas :)
generateEnemies(Math.floor(Math.random() * maxEnemies) + 1);

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
