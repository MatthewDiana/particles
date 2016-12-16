var SurvivalGame = function() {};

var player,
  music,
  gameText,
  retryText,
  retryTextStyle,
  retryTextHoverStyle,
  enemyBallGroup,
  ballSpawnTimer,
  ballCount,
  respawnDelay,
  gameOver,
  maxBallSpeed;

SurvivalGame.prototype = {
  preload: function() {

  },
  create: function() {
    game.stage.backgroundColor = '#FFF';
    gameText = game.add.text(50, 50, 'Dodge the particles. Good luck.');
    music = game.add.audio('cerebral_infection');
    music.volume = 0.10;
    music.play();

    game.physics.startSystem(Phaser.Physics.ARCADE);
    player = game.add.sprite(game.world.centerX - 16, game.world.centerY - 16, 'blueball');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    enemyBallGroup = game.add.physicsGroup();

    ballCount = 0;
    respawnDelay = 5000;
    gameOver = false;
    maxBallSpeed = 300;

    ballSpawnTimer = game.time.create(false);
    game.time.events.add(Phaser.Timer.SECOND * 10.75, this.startSpawning, this);
  },
  update: function() {
    game.physics.arcade.moveToPointer(player, 600);
    if (!Phaser.Rectangle.contains(player.body, game.input.x, game.input.y)) {
      player.body.x = game.input.x;
      player.body.y = game.input.y;
      player.body.velocity.setTo(0, 0);
    }
    game.physics.arcade.collide(enemyBallGroup, enemyBallGroup);
    game.physics.arcade.collide(player, enemyBallGroup, this.collisionHandler, this.processHandler, this);
  },
  startSpawning: function() {
    gameText.destroy();
    this.spawnBall();
    ballSpawnTimer.loop(respawnDelay, this.spawnBall, this);
    ballSpawnTimer.start();
  },
  spawnBall: function() {
    if (!gameOver) {
      let newBall = game.add.sprite( game.world.randomX, game.world.randomY, 'redball');
      newBall.alpha = 0;
      let fadeIn = game.add.tween(newBall).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
      fadeIn.onComplete.add(function() {
        game.physics.arcade.enable(newBall);
        let randXVelocity = Math.floor(Math.random() * (maxBallSpeed + maxBallSpeed) + 1) - maxBallSpeed;
        let randYVelocity = Math.floor(Math.random() * (maxBallSpeed + maxBallSpeed) + 1) - maxBallSpeed;
        newBall.body.velocity.setTo(randXVelocity, randYVelocity);
        newBall.body.collideWorldBounds = true;
        newBall.body.bounce.set(1);
        enemyBallGroup.add(newBall);
      }, this);
      ballCount++;
    }
  },
  processHandler: function(player, enemyBall) {
    return true;
  },
  collisionHandler: function(player, enemyBall) {
    if (!gameOver) {
      gameOver = true;
      music.stop();
      game.physics.arcade.gravity.y = 1800;
      gameText = game.add.text(50, 50, `Score: ${ballCount} particles`);
      retryText = game.add.text(game.world.width - 200, 50, `Play again`);
      retryText.inputEnabled = true;
      retryText.events.onInputOut.add(() => retryText.fill = '#000', this);
      retryText.events.onInputOver.add(() => retryText.fill = '#F00', this);
      retryText.events.onInputDown.add(() => game.state.start('SurvivalGame'), this);
    }
  }
};
