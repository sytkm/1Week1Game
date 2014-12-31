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
//# sourceMappingURL=Game.js.map