var LoadingSplash = function() {};

LoadingSplash.prototype = {
  loadScripts: function() {
    game.load.script('menu', 'js/states/menu.js');
    game.load.script('survivalgame', 'js/states/survivalgame.js');
  },
  loadAudio: function() {
    game.load.audio('cerebral_infection', 'assets/audio/cerebral_infection.mp3');
  },
  loadImages: function() {

  },
  preload: function() {
    this.loadScripts();
    this.loadAudio();
    this.loadImages();
  },
  create: function() {
    game.state.add('Menu', Menu);
    game.state.add('SurvivalGame', SurvivalGame);
    game.state.start('Menu');
  }
};
