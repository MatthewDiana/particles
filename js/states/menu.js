var Menu = function() {};

var titleText;

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    game.stage.backgroundColor = '#FFF';

    titleText = game.add.text(game.world.centerX, game.world.centerY, 'PLAY');
    titleText.anchor.set(0.5);
    titleText.inputEnabled = true;
    titleText.font = 'Arial';
    titleText.fontWeight = 'bold';
    titleText.fontSize = '60px';
    titleText.events.onInputOut.add(() => titleText.fill = '#000', this);
    titleText.events.onInputOver.add(() => titleText.fill = '#F00', this);
    titleText.events.onInputDown.add(() => game.state.start('SurvivalGame'), this);

    player = game.add.sprite(game.world.centerX - 16, game.world.centerY - 16, 'blueball');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
  },
  update: function() {
    game.physics.arcade.moveToPointer(player, 600);
    if (!Phaser.Rectangle.contains(player.body, game.input.x, game.input.y)) {
      player.body.x = game.input.x;
      player.body.y = game.input.y;
      player.body.velocity.setTo(0, 0);
    }
  }
};
