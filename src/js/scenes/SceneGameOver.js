import axios from 'axios';
import { ScrollingBackground } from './utils/ScrollingBackground';

const gameId = '7LB4DVqRjgyTZD1s38uU'
export default class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneGameOver',
    });
  };

  preload() {
    this.load.image('sprBtnSave', './img/buttons/sprBtnSave.png');
    this.load.image('sprBtnSaveHover', './img/buttons/sprBtnSaveHover.png');
    this.load.image('sprBtnSaveDown', './img/buttons/sprBtnSaveDown.png');
    this.load.image('sprBtnRestart', './img/buttons/sprBtnRestart.png');
    this.load.image('sprBtnRestartHover', './img/buttons/sprBtnRestartHover.png');
    this.load.image('sprBtnRestartDown', './img/buttons/sprBtnRestartDown.png');

    this.load.audio('sndBtnOver', './audio/buttons/sndBtnOver.wav');
    this.load.audio('sndBtnDown', './audio/buttons/sndBtnDown.wav');

    this.load.image('sprBg0', './img/background.png');
    this.load.image('sprBg1', './img/sprBg1.png');
    this.load.image('sprBg2', './img/sprBg2.png');
  };

  create() {
    this.title = this.add.text(this.game.config.width * .5, 128, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 60,
      fontStyle: 'bold',
      color: '#fff',
      align: 'center',
    });
    this.title.setOrigin(.5);

    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };

    const input = document.createElement('input');
    const element = this.add.dom(this.game.config.width * .5, this.game.config.height * .4, input);

    this.btnSaveScore = this.add.sprite(
      this.game.config.width * .5,
      this.game.config.height * .5,
      'sprBtnSave'
    );
    this.btnSaveScore.setInteractive();
    
    this.btnSaveScore.on('pointerover', () => {
      this.btnSaveScore.setTexture('sprBtnSaveHover');
      this.sfx.btnOver.play();
    }, this);

    this.btnSaveScore.on('pointerout', () => {
      this.btnSaveScore.setTexture('sprBtnSave');
    });
    
    this.btnSaveScore.on('pointerdown', () => {
      this.btnSaveScore.setTexture('sprBtnSaveDown');
      this.sfx.btnDown.play();
    }, this);

    this.btnSaveScore.on('pointerup', () => {
      this.btnSaveScore.setTexture('sprBtnSave');
      try {
        axios.post(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`, {

        });
      } catch (err) {
        console.log(err);
      }
    }, this);


    this.btnRestart = this.add.sprite(
      this.game.config.width * .5,
      this.game.config.height * .6,
      'sprBtnRestart',
    );

    this.btnRestart.setInteractive();

    this.btnRestart.on('pointerover', () => {
      this.btnRestart.setTexture('sprBtnRestartHover');
      this.sfx.btnOver.play();
    }, this);

    this.btnRestart.on('pointerout', () => {
      this.btnRestart.setTexture('sprBtnRestart');
    });
    
    this.btnRestart.on('pointerdown', () => {
      this.btnRestart.setTexture('sprBtnRestartDown');
      this.sfx.btnDown.play();
    }, this);

    this.btnRestart.on('pointerup', () => {
      this.btnRestart.setTexture('sprBtnRestart');
      this.scene.start('SceneMain');
    }, this);

    this.btnLeaderboard = this.add.sprite(
      this.game.config.width * .5,
      this.game.config.height * .7,
      'sprBtnLeaderboard'
    )
    this.btnLeaderboard.setInteractive();

    this.btnLeaderboard.on('pointerover', () => {
      this.btnLeaderboard.setTexture('sprBtnLeaderboardHover');
      this.sfx.btnOver.play();
    });

    this.btnLeaderboard.on('pointerout', () => {
      this.btnLeaderboard.setTexture('sprBtnLeaderboard');
    });

    this.btnLeaderboard.on('pointerdown', () => {
      this.btnLeaderboard.setTexture('sprBtnLeaderboardDown');
      this.sfx.btnDown.play();
    })

    this.btnLeaderboard.on('pointerup', () => {
      this.scene.start('SceneLeaderboard');
    })

    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      let bg = new ScrollingBackground(this, 'sprBg1', -(i * 10));
      this.backgrounds.push(bg);
    }

    let bg = this.add.sprite(0, 0, 'sprBg0');
    bg.setDepth(-10);

  };

  update() {
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  };
}