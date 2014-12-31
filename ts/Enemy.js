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
//# sourceMappingURL=Enemy.js.map