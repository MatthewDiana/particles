var game = new Phaser.Game(800, 600, Phaser.AUTO, 'particles'), Main = function() {};

Main.prototype = {
    preload: function() {
        game.load.image('blueball', 'assets/images/blue_ball_32_trans.png');
        game.load.image('redball', 'assets/images/red_ball_32_trans.png');
        game.load.script('loadingsplash', 'js/states/loadingsplash.js');
    },
    create: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.maxWidth = 800;
        game.scale.maxHeight = 600;

        game.state.add('LoadingSplash', LoadingSplash);
        game.state.start('LoadingSplash');
    }
};

game.state.add('Main', Main);
game.state.start('Main');
