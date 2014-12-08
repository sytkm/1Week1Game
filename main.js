var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="./phaser.d.ts"/>
///<reference path="Boot.ts"/>
///<reference path="Preloader.ts"/>
///<reference path="MainMenu.ts"/>
///<reference path="Level1.ts"/>
///<reference path="Player.ts"/>
var RunGame;
(function (RunGame) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 600, Phaser.AUTO, 'content', null);
            this.state.add('Boot', RunGame.Boot, false);
            this.state.add('Preloader', RunGame.Preloader, false);
            this.state.add('MainMenu', RunGame.MainMenu, false);
            this.state.add('Level1', RunGame.Level1, false);
            this.state.add('GameOver', RunGame.GameOver, false);
            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    RunGame.Game = Game;
})(RunGame || (RunGame = {}));
///<reference path="./phaser.d.ts"/>
///<reference path="Boot.ts"/>
///<reference path="Preloader.ts"/>
///<reference path="MainMenu.ts"/>
///<reference path="Level1.ts"/>
///<reference path="Game.ts"/>
var RunGame;
(function (RunGame) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            _super.call(this, game, x, y, 'bird', 0);
            this.anchor.setTo(0.5, 0);
            this.smoothed = false;
            this.ground = y;
            this.game.add.existing(this);
            this.game.physics.arcade.enableBody(this);
            this.body.checkCollision.any = true;
        }
        Player.prototype.update = function () {
            console.log(this.body.gravity.y, this.body.velocity.y, this.jump);
            this.body.gravity.y = 1200;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                if (this.jump) {
                    this.jump = false;
                    this.body.velocity.y = -600;
                }
            }
            if (this.ground == this.y) {
                this.jump = true;
            }
        };
        return Player;
    })(Phaser.Sprite);
    RunGame.Player = Player;
})(RunGame || (RunGame = {}));
///<reference path="./phaser.d.ts"/>
///<reference path="Boot.ts"/>
///<reference path="Preloader.ts"/>
///<reference path="MainMenu.ts"/>
///<reference path="Level1.ts"/>
///<reference path="Game.ts"/>
///<reference path="Player.ts"/>
var RunGame;
(function (RunGame) {
    var Enemy = (function (_super) {
        __extends(Enemy, _super);
        function Enemy(game, x, y) {
            _super.call(this, game, x, y, 'pipe', 0);
            this.anchor.setTo(0.5, 0);
            this.smoothed = false;
            game.add.existing(this);
            this.game.physics.arcade.enableBody(this);
        }
        Enemy.prototype.update = function () {
            this.checkWorldBounds = true;
            this.outOfBoundsKill = true;
            this.body.velocity.x = -400;
        };
        return Enemy;
    })(Phaser.Sprite);
    RunGame.Enemy = Enemy;
})(RunGame || (RunGame = {}));
///<reference path="./phaser.d.ts"/>
///<reference path="Boot.ts"/>
///<reference path="Preloader.ts"/>
///<reference path="MainMenu.ts"/>
///<reference path="Player.ts"/>
///<reference path="Game.ts"/>
///<reference path="Enemy.ts"/>
var RunGame;
(function (RunGame) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            _super.apply(this, arguments);
        }
        Level1.prototype.create = function () {
            this.player = new RunGame.Player(this.game, 130, 334);
            this.base = new Phaser.Sprite(this.game, 0, 384, 'bird', 0);
            this.base.scale.setTo(16, 1);
            this.game.add.existing(this.base);
            this.game.physics.arcade.enableBody(this.base);
            this.base.body.checkCollision.any = true;
            this.base.body.immovable = true;
            this.enemiesG = new Phaser.Group(this.game);
            this.enemiesG.classType = RunGame.Enemy;
            this.timer = this.game.time.events.loop(500, this.addEnemy, this);
            this.score = 0;
            this.labelScore = this.game.add.text(20, 20, "0", { fill: "#ffffff" });
        };
        Level1.prototype.update = function () {
            this.game.physics.arcade.collide(this.player, this.base);
            this.game.physics.arcade.overlap(this.player, this.enemiesG, this.restartGame, null, this);
        };
        Level1.prototype.restartGame = function () {
            this.game.state.start('GameOver', true, false, this.score);
            return null;
        };
        Level1.prototype.addEnemy = function () {
            this.enemy = this.enemiesG.create(800, this.game.rnd.integerInRange(134, 334), 'pipe');
            this.score += 1;
            this.labelScore.text = String(this.score);
            return null;
        };
        return Level1;
    })(Phaser.State);
    RunGame.Level1 = Level1;
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        function GameOver() {
            _super.apply(this, arguments);
        }
        GameOver.prototype.init = function (score) {
            this.finalscore = score;
            if (score > Number(localStorage.getItem("highscore"))) {
                localStorage.setItem("highscore", String(score));
            }
        };
        GameOver.prototype.create = function () {
            this.thisScorelabel = this.game.add.text(400, 200, String(this.finalscore), { fill: "#ffffff" });
            this.thisScorelabel.anchor.set(0.5, 0.5);
            this.highScorelabel = this.game.add.text(400, 250, localStorage.getItem("highscore"), { fill: "#ffffff" });
            this.highScorelabel.anchor.set(0.5, 0.5);
            this.restartButton = this.game.add.text(400, 300, "RESTART", { fill: "#ffffff" });
            this.restartButton.inputEnabled = true;
            this.restartButton.anchor.set(0.5, 0.5);
            this.restartButton.events.onInputDown.add(this.restart, this);
        };
        GameOver.prototype.restart = function () {
            this.game.state.start('Level1', true, false);
            return null;
        };
        return GameOver;
    })(Phaser.State);
    RunGame.GameOver = GameOver;
})(RunGame || (RunGame = {}));
///<reference path="./phaser.d.ts"/>
///<reference path="Boot.ts"/>
///<reference path="Preloader.ts"/>
///<reference path="Level1.ts"/>
///<reference path="Player.ts"/>
///<reference path="Game.ts"/>
var RunGame;
(function (RunGame) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;
            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Bounce.Out, true, 2000);
            this.input.onDown.addOnce(this.fadeOut, this);
        };
        MainMenu.prototype.fadeOut = function () {
            this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('Level1', true, false);
        };
        return MainMenu;
    })(Phaser.State);
    RunGame.MainMenu = MainMenu;
})(RunGame || (RunGame = {}));
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
///<reference path="./phaser.d.ts"/>
///<reference path="Preloader.ts"/>
///<reference path="MainMenu.ts"/>
///<reference path="Level1.ts"/>
///<reference path="Player.ts"/>
///<reference path="Game.ts"/>
var RunGame;
(function (RunGame) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', './assets/loader.png');
        };
        Boot.prototype.create = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
                this.scale.pageAlignHorizontally = true;
            }
            else {
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.scale.minWidth = 480;
                this.scale.minHeight = 260;
                this.scale.maxWidth = 1024;
                this.scale.maxHeight = 768;
                this.scale.pageAlignHorizontally = true;
            }
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    RunGame.Boot = Boot;
})(RunGame || (RunGame = {}));
///<reference path="./phaser.d.ts"/>
///<reference path="Boot.ts"/>
///<reference path="Preloader.ts"/> 
///<reference path="MainMenu.ts"/>
///<reference path="Level1.ts"/>
///<reference path="Player.ts"/>
///<reference path="Game.ts"/>
window.onload = function () {
    var game = new RunGame.Game();
};
