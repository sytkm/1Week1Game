var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="./phaser.d.ts"/>
///<reference path="Boot.ts"/>
///<reference path="MainMenu.ts"/>
///<reference path="Level1.ts"/>
///<reference path="Player.ts"/>
///<reference path="Game.ts"/>
var RunGame;
(function (RunGame) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            this.load.image('titlepage', './assets/titlepage.jpg');
            this.load.image('logo', './assets/logo.png');
            this.load.spritesheet('bird', './assets/bird.png', 50, 50, 1);
            this.load.image('level1', './assets/level1.png');
            this.load.spritesheet('pipe', './assets/pipe.png', 50, 50, 1);
            if (localStorage.getItem("highscore") == null) {
                localStorage.setItem("highscore", String(0));
            }
        };
        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    })(Phaser.State);
    RunGame.Preloader = Preloader;
})(RunGame || (RunGame = {}));
//# sourceMappingURL=Preloader.js.map