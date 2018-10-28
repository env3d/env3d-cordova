"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var Ball = /** @class */ (function () {
    function Ball() {
        this.x = 5;
        this.y = 5;
        this.z = 5;
        this.rotateY = 0;
        this.texture = "textures/doty.png";
    }
    return Ball;
}());
"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var Env = env3d.Env;
var Game = /** @class */ (function () {
    function Game() {
        this.env = new Env();
        this.b = new Ball();
    }
    Game.prototype.loop = function () {
        this.b.rotateY++;
    };
    Game.prototype.start = function () {
        this.env.setCameraXYZ(5, 5, 25);
        this.env.addObject(this.b);
        this.env.start();
    };
    return Game;
}());
env3d.Env.baseAssetsUrl = "https://env3d.github.io/env3d-js/dist/";
var game = new Game();
parent.window["game"] = game;
game.env && game.env.scene 
         && game.env.scene.add(new THREE.HemisphereLight( 0x7f7f7f, 0x000000, 2 ));
game.start();
window.setInterval(game.loop.bind(game), 32);