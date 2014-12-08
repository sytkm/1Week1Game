///<reference path="./phaser.d.ts"/>
///<reference path="Boot.ts"/>
///<reference path="MainMenu.ts"/>
///<reference path="Level1.ts"/>
///<reference path="Player.ts"/>
///<reference path="Game.ts"/>
module RunGame {
    export class Preloader extends Phaser.State {
        preloadBar: Phaser.Sprite;
        preload() {
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            this.load.image('titlepage', './assets/titlepage.jpg');
            this.load.image('logo', './assets/logo.png');
            this.load.spritesheet('bird', './assets/bird.png', 50, 50, 1);
            this.load.image('level1', './assets/level1.png');
            this.load.spritesheet('pipe', './assets/pipe.png', 50, 50, 1);
            if(localStorage.getItem("highscore") == null){
                localStorage.setItem("highscore",String(0));
            }
        }
        create() {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        }
        startMainMenu() {
            this.game.state.start('MainMenu', true, false);
        }
    }
}