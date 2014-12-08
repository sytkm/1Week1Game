///<reference path="./phaser.d.ts"/>

///<reference path="Boot.ts"/>
///<reference path="Preloader.ts"/>
///<reference path="MainMenu.ts"/>
///<reference path="Level1.ts"/>
///<reference path="Game.ts"/>
module RunGame {
    export class Player extends Phaser.Sprite {
        ground: number;
        jump: boolean;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'bird', 0);
            this.anchor.setTo(0.5, 0);
            this.smoothed = false;
            this.ground = y;
            this.game.add.existing(this);
            this.game.physics.arcade.enableBody(this);
            this.body.checkCollision.any = true;
        }
        
        update() {
            console.log(this.body.gravity.y,this.body.velocity.y,this.jump);
            this.body.gravity.y = 1200;
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                if(this.jump){
                    this.jump = false;
                    this.body.velocity.y = -600;
                }

            }
            if(this.ground == this.y){
                this.jump = true;
            }
        }
    }
}