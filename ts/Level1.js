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
//# sourceMappingURL=Level1.js.map