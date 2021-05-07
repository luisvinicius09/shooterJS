import { ScrollingBackground } from "./utils/ScrollingBackground";

export default class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneMainMenu',
    });
  };

  preload() {
    this.load.image('sprBtnPlay', './img/buttons/sprBtnPlay.png');
    this.load.image('sprBtnPlayHover', './img/buttons/sprBtnPlayHover.png');
    this.load.image('sprBtnPlayDown', './img/buttons/sprBtnPlayDown.png');
    this.load.image('sprBtnRestart', './img/buttons/sprBtnRestart.png');
    this.load.image('sprBtnRestartHover', './img/buttons/sprBtnRestartHover.png');
    this.load.image('sprBtnRestartDown', './img/buttons/sprBtnRestartDown.png');
    this.load.image('sprBtnLeaderboard', './img/buttons/sprBtnLeaderboard.png');
    this.load.image('sprBtnLeaderboardHover', './img/buttons/sprBtnLeaderboardHover.png');
    this.load.image('sprBtnLeaderboardDown', './img/buttons/sprBtnLeaderboardDown.png');

    this.load.audio('sndBtnOver', './audio/buttons/sndBtnOver.wav');
    this.load.audio('sndBtnDown', './audio/buttons/sndBtnDown.wav');

    this.load.image('sprBg0', './img/background.png');
    this.load.image('sprBg1', './img/sprBg1.png');
    this.load.image('sprBg2', './img/sprBg2.png');
  };

  create() {
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };

    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprBtnPlay',
    );
    this.btnPlay.setInteractive();

    this.btnPlay.on('pointerover', () => {
      this.btnPlay.setTexture('sprBtnPlayHover');
      this.sfx.btnOver.play();
    }, this);

    this.btnPlay.on('pointerout', () => {
      this.btnPlay.setTexture('sprBtnPlay');
    });

    this.btnPlay.on('pointerdown', () => {
      this.btnPlay.setTexture('sprBtnPlayDown');
      this.sfx.btnDown.play();      
    }, this);

    this.btnPlay.on('pointerup', () => {
      this.btnPlay.setTexture('sprBtnPlay');
      this.scene.start('SceneMain');
    }, this);

    this.title = this.add.text(this.game.config.width * .5, 128, 'SHOOTERJS', {
      fontFamily: 'monospace',
      fontSize: 60,
      fontStyle: 'bold',
      color: '#fff',
      align: 'center',
    });
    this.title.setOrigin(.5);

    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      let bg = new ScrollingBackground(this, 'sprBg1', -(i * 10));
      this.backgrounds.push(bg);
    }

    let bg = this.add.sprite(0, 0, 'sprBg0');
    bg.setDepth(-10);

    this.btnLeaderboard = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.6,
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
  };

  update() {
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  };
}