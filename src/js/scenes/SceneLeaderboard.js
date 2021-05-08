let scores;

const gameId = '7LB4DVqRjgyTZD1s38uU'

const axios = require('axios');

export default class SceneLeaderboard extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneLeaderboard',
    });
    this.scores = [];
  };

  preload() {
    this.load.image('sprBtnMenu', './img/buttons/sprBtnMenu.png');
    this.load.image('sprBtnMenuHover', './img/buttons/sprBtnMenuHover.png');
    this.load.image('sprBtnMenuDown', './img/buttons/sprBtnMenuDown.png');
    
    this.load.audio('sndBtnOver', './audio/buttons/sndBtnOver.wav');
    this.load.audio('sndBtnDown', './audio/buttons/sndBtnDown.wav');
  };

  retrieveData() {
    axios.get(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`)
    .then((res) => {
      this.scores = res.data.result;
    })
  }

  create() {
    this.retrieveData();
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };

    this.title = this.add.text(this.game.config.width * .5, 100, 'LEADERBOARD', {
      fontFamily: 'monospace',
      fontSize: 60,
      fontStyle: 'bold',
      color: '#fff',
      align: 'center',
    });
    this.title.setOrigin(.5);


    this.btnMenu = this.add.sprite(
      this.game.config.width * .5,
      this.game.config.height * 0.1,
      'sprBtnMenu'
    );
    this.btnMenu.setInteractive();

    this.btnMenu.on('pointerover', () => {
      this.btnMenu.setTexture('sprBtnMenuHover');
      this.sfx.btnOver.play();
    });

    this.btnMenu.on('pointerout', () => {
      this.btnMenu.setTexture('sprBtnMenu');
    });

    this.btnMenu.on('pointerdown', () => {
      this.btnMenu.setTexture('sprBtnMenuDown');
      this.sfx.btnDown.play();
    });

    this.btnMenu.on('pointerup', () => {
      this.btnMenu.setTexture('sprBtnMenu');
      this.scene.start('SceneMainMenu');
    });

    for (let i = 0; i < this.scores.length; i += 1) {
      if (this.scores.length === 0) {

      }
      this.add.text(this.game.config.width * .5, 200 + 30 * i, `${this.scores[i]}`);
    };

  };
};
