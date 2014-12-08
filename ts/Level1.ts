///<reference path="./phaser.d.ts"/>
///<reference path="Boot.ts"/>
///<reference path="Preloader.ts"/>
///<reference path="MainMenu.ts"/>
///<reference path="Player.ts"/>
///<reference path="Game.ts"/>
///<reference path="Enemy.ts"/>
module RunGame {
    export class Level1 extends Phaser.State {

        background: Phaser.Sprite;
        music: Phaser.Sound;
        player: RunGame.Player;
        enemy: RunGame.Enemy;
        base:Phaser.Sprite;
        enemiesG:Phaser.Group;
        timer:Phaser.TimerEvent;
        score:number;
        labelScore: Phaser.Text;
        create() {
            this.player = new Player(this.game, 130, 334);
            this.base = new Phaser.Sprite(this.game,0,384,'bird',0);
            this.base.scale.setTo(16,1);
            this.game.add.existing(this.base);
            this.game.physics.arcade.enableBody(this.base);
            this.base.body.checkCollision.any = true;
            this.base.body.immovable = true;
            this.enemiesG = new Phaser.Group(this.game);
            this.enemiesG.classType = RunGame.Enemy;
            this.timer = this.game.time.events.loop(500,this.addEnemy,this);
            this.score = 0;
            this.labelScore = this.game.add.text(20,20,"0",{fill: "#ffffff"});
            
        }
        update() {
            this.game.physics.arcade.collide(this.player,this.base);
            this.game.physics.arcade.overlap(this.player,this.enemiesG,this.restartGame,null,this);
        }
        restartGame():Function {
                this.game.state.start('GameOver', true, false, this.score);
            return null;
        }
        addEnemy():Function {
            this.enemy = this.enemiesG.create(800,this.game.rnd.integerInRange(84,334),'pipe');
            this.score += 1;
            this.labelScore.text = String(this.score);
            return null;
        }
    }
    export class GameOver extends Phaser.State {
        restartButton:Phaser.Text;
        highScorelabel:Phaser.Text;
        thisScorelabel:Phaser.Text;
        finalscore:number;
        init(score:number){
                this.finalscore = score;
            if(score> Number(localStorage.getItem("highscore"))){
                localStorage.setItem("highscore",String(score));
            }
        }
        create() {
            this.thisScorelabel = this.game.add.text(400,200,String(this.finalscore),{fill: "#ffffff"});
            this.thisScorelabel.anchor.set(0.5,0.5);
            this.highScorelabel = this.game.add.text(400,250,localStorage.getItem("highscore"),{fill: "#ffffff"});
            this.highScorelabel.anchor.set(0.5,0.5);
            this.restartButton = this.game.add.text(400,300,"RESTART",{fill: "#ffffff"});
           this.restartButton.inputEnabled = true;
            this.restartButton.anchor.set(0.5,0.5);
            this.restartButton.events.onInputDown.add(this.restart,this);
        }
        restart():Function {
            this.game.state.start('Level1',true,false);
            return null;
        }
    }
}