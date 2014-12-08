///<reference path="./phaser.d.ts"/>
///<reference path="Boot.ts"/>
///<reference path="Preloader.ts"/>
///<reference path="MainMenu.ts"/>
///<reference path="Level1.ts"/>
///<reference path="Game.ts"/>
///<reference path="Player.ts"/>
module RunGame {
    export class Enemy extends Phaser.Sprite {
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'pipe', 0);
            this.anchor.setTo(0.5, 0);
            this.smoothed = false;
            game.add.existing(this);
            this.game.physics.arcade.enableBody(this);
        }
        update() {
            this.checkWorldBounds = true;
            this.outOfBoundsKill = true;
            this.body.velocity.x = -400;
        }
    }
}