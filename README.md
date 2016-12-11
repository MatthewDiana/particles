<img src="http://www.matthewdiana.com/res/particles_logo.png">

Dodge the particles in this fun and simple HTML5 game.

## Play

<a href="http://www.matthewdiana.com/particles">Click here</a> to try the game.

## Modify

Clone this repository:

```
git clone https://github.com/MatthewDiana/particles.git
```

Entry point can be found in `js/main.js`. Code for the various game states can be found in `js/states/`. Images and audio can be found in `assets/`.

You should be using a local web server for your development (learn why loading assets over `file://` can be dangerous [here](https://blog.chromium.org/2008/12/security-in-depth-local-web-pages.html)). If you have Python installed on your system, this can be easily accomplished by spawning a `SimpleHTTPServer` in the project's root directory:

```
python -m SimpleHTTPServer 8080
```

Alternatively, you can use the [Web Server for Chrome](https://github.com/kzahel/web-server-chrome) extension if you are a fan of Google's web browser.

You can then access the game by pointing to `http://localhost:8080/`.

## Frameworks

* [Phaser](https://phaser.io/) - Open source HTML5 game framework for Canvas and WebGL.

## Thanks
* [Ragdollsoft](http://www.kongregate.com/accounts/Ragdollsoft) for the game idea.
* [Dimrain47](http://dimrain47.newgrounds.com/) for the great song.
