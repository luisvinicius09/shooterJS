export default class ScenePause extends Phaser.Scene {
  constructor() {
    super({
      key: 'ScenePause',
    });
  };

  preload() {
    this.load.image('sprBtnResume', './img/buttons/sprBtnRestart.png');
    this.load.image('sprBtnResumeHover', './img/buttons/sprBtnResumeHover.png');
    this.load.image('sprBtnResumeDown', './img/buttons/sprBtnResumeDown,png');

    this.load.audio('sndBtnOver', './audio/buttons/sndBtnOver.wav');
    this.load.audio('sndBtnDown', './audio/buttons/sndBtnDown.wav');
  };

  create() {
    this.title = this.add.text(this.game.config.width * .5, 128, 'PAUSED', {
      fontFamily: 'monospace',
      fontSize: 60,
      fontStyle: 'bold',
      color: '#fff',
      align: 'center',
    });
    this.title.setOrigin(.5);
    this.btnResume = this.add.sprite(
      this.game.config.width * .5,
      this.game.config.width * .5,
      'sprBtnResume',
    );
    this.btnResume.setInteractive();

    this.btnResume.on('pointerover', () => {

    }, this);

    this.btnResume.on('pointerout', () => {

    }, this);

    this.btnResume.on('pointerdown', () => {

    }, this);

    this.btnResume.on('pointerup', () => {
      this.scene.resume('SceneMain');
      this.scene.stop();
    }, this);

  };
}