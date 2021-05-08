export default class ScenePause extends Phaser.Scene {
  constructor() {
    super({
      key: 'ScenePause',
    });
  };

  preload() {
    this.load.image('sprBtnResume', './img/buttons/sprBtnResume.png');
    this.load.image('sprBtnResumeHover', './img/buttons/sprBtnResumeHover.png');
    this.load.image('sprBtnResumeDown', './img/buttons/sprBtnResumeDown.png');

    this.load.audio('sndBtnOver', './audio/buttons/sndBtnOver.wav');
    this.load.audio('sndBtnDown', './audio/buttons/sndBtnDown.wav');
  };

  create() {
    this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };

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
      this.btnResume.setTexture('sprBtnResumeHover');
      this.sfx.btnOver.play();
    }, this);

    this.btnResume.on('pointerout', () => {
      this.btnResume.setTexture('sprBtnResume');
    }, this);

    this.btnResume.on('pointerdown', () => {
      this.btnResume.setTexture('sprBtnResumeDown');
      this.sfx.btnDown.play();
    }, this);

    this.btnResume.on('pointerup', () => {
      this.scene.resume('SceneMain');
      this.scene.stop();
    }, this);

  };

  update() {
    if (this.keyEsc.isDown) {
      this.scene.resume('SceneMain');
      this.scene.stop();
    }
  }
}