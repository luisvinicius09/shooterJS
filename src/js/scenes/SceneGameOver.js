import axios from 'axios';
import { ScrollingBackground } from './utils/ScrollingBackground';

const gameId = '7LB4DVqRjgyTZD1s38uU';

export default class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneGameOver',
    });
    this.score = 0;
  };

  init(data) {
    this.score = data.score;
  }

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
      btnOver: this.sound.add('sndBtnOver', { volume: 0.3 }),
      btnDown: this.sound.add('sndBtnDown', { volume: 0.3 }),
    };

    const input = document.createElement('input');
    input.id = 'nameInput';
    input.autocomplete = 'off';
    input.placeholder = 'Type your name here'

    this.add.dom(this.game.config.width * .5, this.game.config.height * .4, input);

    this.subInput = this.add.text(this.game.config.width * .5, this.game.config.height * .45, "(OPTIONAL)");
    this.subInput.setOrigin(.5);

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
        const nameValue = document.getElementById('nameInput');
        if (nameValue.value.length == 0) {
          if (this.warning) {
            this.warning.destroy();
          }
          this.warning = this.add.text(this.game.config.width * .5, this.game.config.height * .35, "You can't save your score without a name!");
          this.warning.setOrigin(.5);
        } else if (nameValue.value.length > 10) {
          if (this.warning) {
            this.warning.destroy();
          }
          this.warning = this.add.text(this.game.config.width * .5, this.game.config.height * .35, 'Your name is too long');
          this.warning.setOrigin(.5);
        } else if (this.score == 0) {
          if(this.warning) {
            this.warning.destroy();
          }
          this.warning = this.add.text(this.game.config.width * .5, this.game.config.height * .35, "You have to score at least 10 points to save your score.");
          this.warning.setOrigin(.5);
        }
        axios.post(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`, {
          user: nameValue.value,
          score: this.score
        }).then(() => {
          this.success = this.scene.scene.add.text(this.game.config.width * .5, this.game.config.height * .35, 'Your score was saved!');
          this.success.setOrigin(.5);
        });
        if (this.warning || this.error) {
          this.warning.destroy();
        }
        if (this.error) {
          this.error.destroy();
        }
        if (this.success) {
          this.success.destroy();
        }
      } catch (err) {
        console.log(err);
        this.error = this.add.text(this.game.config.width * .5, this.game.config.height * .35, 'Something went wrong!');
        this.error.setOrigin(.5);
      }
    }, this);


    this.btnRestart = this.add.sprite(
      this.game.config.width * .5,
      this.game.config.height * .65,
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
      this.game.config.height * .75,
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