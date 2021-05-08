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
    this.load.image('sprBtnMenu', './img/buttons/sprBtnMenu.png');
    this.load.image('sprBtnMenuHover', './img/buttons/sprBtnMenuHover.png');
    this.load.image('sprBtnMenuDown', './img/buttons/sprBtnMenuDown.png');

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
      this.game.config.height * .5,
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

    this.btnMenu = this.add.sprite(
      this.game.config.width * .5,
      this.game.config.height * .6,
      'sprBtnMenu'
    );
    this.btnMenu.setInteractive();

    this.btnMenu.on('pointerover', () => {
      this.btnMenu.setTexture('sprBtnMenuHover');
      this.sfx.btnOver.play();
    }, this);

    this.btnMenu.on('pointerout', () => {
      this.btnMenu.setTexture('sprBtnMenu');
    }, this);

    this.btnMenu.on('pointerdown', () => {
      this.btnMenu.setTexture('sprBtnMenuDown');
      this.sfx.btnDown.play();
    }, this);

    this.btnMenu.on('pointerup', () => {
      this.btnMenu.setTexture('sprBtnMenu');
      this.scene.setVisible(false, 'SceneMain');
      this.scene.start('SceneMainMenu');
    }, this);

  };

  update() {
    if (this.keyEsc.isDown) {
      this.scene.resume('SceneMain');
      this.scene.stop();
    }
  }
}