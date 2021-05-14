// eslint-disable-next-line import/no-unresolved
import Phaser from 'phaser';

export default class ScenePause extends Phaser.Scene {
  constructor() {
    super({
      key: 'ScenePause',
    });
  }

  create() {
    this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    this.sfx = {
      btnOver: this.sound.add('sndBtnOver', { volume: 0.3 }),
      btnDown: this.sound.add('sndBtnDown', { volume: 0.3 }),
    };

    this.title = this.add.text(this.game.config.width * 0.5, 128, 'PAUSED', {
      fontFamily: 'monospace',
      fontSize: 60,
      fontStyle: 'bold',
      color: '#fff',
      align: 'center',
    });
    this.title.setOrigin(0.5);
    this.btnResume = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprBtnResume',
    );
    this.btnResume.setInteractive();

    this.btnResume.on('pointerover', () => {
      this.btnResume.setTexture('sprBtnResumeHover');
      this.sfx.btnOver.play();
    });

    this.btnResume.on('pointerout', () => {
      this.btnResume.setTexture('sprBtnResume');
    });

    this.btnResume.on('pointerdown', () => {
      this.btnResume.setTexture('sprBtnResumeDown');
      this.sfx.btnDown.play();
    });

    this.btnResume.on('pointerup', () => {
      this.scene.resume('SceneMain');
      this.scene.stop();
    });

    this.btnMenu = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.6,
      'sprBtnMenu',
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
      this.scene.setVisible(false, 'SceneMain');
      this.scene.start('SceneMainMenu');
    });
  }

  update() {
    if (this.keyEsc.isDown) {
      this.scene.resume('SceneMain');
      this.scene.stop();
    }
  }
}