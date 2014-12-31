///<reference path="./phaser.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
//# sourceMappingURL=Player.js.map