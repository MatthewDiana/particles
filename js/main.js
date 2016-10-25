var game = new Phaser.Game(800, 600, Phaser.AUTO, 'particles', { preload: preload, create: create, update: update });
//var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, 'particles', { preload: preload, create: create, update: update });

var player;
var music;
var gameText;

var enemyBallGroup;
var ballSpawnTimer;
var ballCount;
var respawnDelay;
var gameOver;
var maxBallSpeed;

function preload() {
	game.load.image('blueball', 'assets/images/blue_ball_32_trans.png');
	game.load.image('redball', 'assets/images/red_ball_32_trans.png');
	game.load.audio('cerebral_infection', 'assets/audio/cerebral_infection.mp3')
}

function create() {
  game.stage.backgroundColor = "#FFFFFF";
	gameText = game.add.text(50, 50, 'Dodge the particles. Good luck.');

	music = game.add.audio('cerebral_infection');
	music.volume = 0.20;
	music.play();

  game.physics.startSystem(Phaser.Physics.ARCADE);
  player = game.add.sprite(game.world.centerX - 16, game.world.centerY - 16, 'blueball');
  game.physics.arcade.enable(player);
	player.body.collideWorldBounds = true;
  enemyBallGroup = game.add.physicsGroup();

  ballCount = 0;
	respawnDelay = 3000;
  gameOver = false;
  maxBallSpeed = 300;

  ballSpawnTimer = game.time.create(false);
	game.time.events.add(Phaser.Timer.SECOND * 12, startSpawning, this);
}

function update() {
    game.physics.arcade.moveToPointer(player, 600);
    if (!Phaser.Rectangle.contains(player.body, game.input.x, game.input.y)) {
			player.body.x = game.input.x;
			player.body.y = game.input.y;
      player.body.velocity.setTo(0, 0);
    }

		game.physics.arcade.collide(enemyBallGroup, enemyBallGroup);
    game.physics.arcade.collide(player, enemyBallGroup, collisionHandler, processHandler, this);
}

function startSpawning() {
	gameText.destroy();
	spawnBall();
	ballSpawnTimer.loop(respawnDelay, spawnBall, this);
	ballSpawnTimer.start();
}

function spawnBall() {
  if (!gameOver) {
    let newBall = game.add.sprite( game.world.randomX, game.world.randomY, 'redball');
    ballCount++;
    newBall.alpha = 0;
    let fadeIn = game.add.tween(newBall).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
    fadeIn.onComplete.add(function() {
      game.physics.arcade.enable(newBall);
			let randXVelocity = Math.floor(Math.random() * (maxBallSpeed + maxBallSpeed) + 1) - maxBallSpeed;
			let randYVelocity = Math.floor(Math.random() * (maxBallSpeed + maxBallSpeed) + 1) - maxBallSpeed;
			console.log(randXVelocity, randYVelocity);
      newBall.body.velocity.setTo(randXVelocity, randYVelocity);
      newBall.body.collideWorldBounds = true;
      newBall.body.bounce.set(1);
			enemyBallGroup.add(newBall);
    }, this);
  }
}

function processHandler(player, enemyBall) {
  return true;
}

function collisionHandler(player, enemyBall) {
  if (!gameOver) {
		gameOver = true;
		music.stop();
    game.physics.arcade.gravity.y = 1800;
    gameText = game.add.text(50, 50, "Final score: " + ballCount + " balls")
  }
}
