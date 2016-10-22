var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.image('blueball', 'assets/blue_ball_32_trans.png');
  game.load.image('redball', 'assets/red_ball_32_trans.png');
}

var player;
var enemyBallGroup;
var ballSpawnTimer;
var ballCount;
var gameOver

function create() {
  game.stage.backgroundColor = "#FFFFFF";
  game.physics.startSystem(Phaser.Physics.ARCADE);
  player = game.add.sprite(game.world.centerX - 16, game.world.centerY - 16, 'blueball');
  game.physics.arcade.enable(player);
  enemyBallGroup = game.add.physicsGroup();

  ballCount = 0;
  gameOver = false;

  ballSpawnTimer = game.time.create(false);
  ballSpawnTimer.loop(4000, spawnBall, this);
  ballSpawnTimer.start();

}


function update() {

    game.physics.arcade.moveToPointer(player, 200);
    if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y)) {
      player.body.velocity.setTo(0, 0);
    }

    if (game.physics.arcade.collide(player, enemyBallGroup, collisionHandler, processHandler, this)) {
      console.log("boom");
    }


}

function spawnBall() {
  if (!gameOver) {
    var newBall = enemyBallGroup.create( Math.random() * game.world.width - 32, Math.random() * game.world.height - 32, 'redball', 1);
    ballCount++;
    newBall.alpha = 0;
    var fadeIn = game.add.tween(newBall).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
    fadeIn.onComplete.add(function() {
      game.physics.enable(newBall, Phaser.Physics.ARCADE);
      newBall.body.velocity.setTo(Math.random() * 300, Math.random() * 300);
      newBall.body.collideWorldBounds = true;
      newBall.body.bounce.set(1);
    }, this);
    enemyBallGroup.add(newBall);
  }
}

function processHandler(player, enemyBall) {
  return true;
}

function collisionHandler(player, enemyBall) {
  if (!gameOver) {
    gameOver = true;
    game.physics.arcade.gravity.y = 1800;
    game.add.text(50, 50, "You lose. Final score: " + ballCount + " balls.")
  }

}
