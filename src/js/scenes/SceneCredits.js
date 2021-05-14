// eslint-disable-next-line import/no-unresolved
import Phaser from 'phaser';

export default class SceneCredits extends Phaser.Scene {
  constructor() {
    super({
      key: 'Credits',
    });
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver', { volume: 0.3 }),
      btnDown: this.sound.add('sndBtnDown', { volume: 0.3 }),
    };

    this.btnMenu = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.1,
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
      this.scene.start('SceneMainMenu');
    });

    this.title = this.add.text(this.game.config.width * 0.5, 100, 'CREDITS', {
      fontFamily: 'monospace',
      fontSize: 40,
      fontStyle: 'bold',
      color: '#fff',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    this.textOne = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.30, 'Player ship By MillionthVector under CC');
    this.textOne.setInteractive();
    this.textOne.setOrigin(0.5);

    this.textOne.on('pointerdown', () => {
      window.open('http://millionthvector.blogspot.de', '_blank');
    });

    this.textTwo = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.40, 'Lasers assets By Wenrexa');
    this.textTwo.setInteractive();
    this.textTwo.setOrigin(0.5);

    this.textTwo.on('pointerdown', () => {
      window.open('https://wenrexa.itch.io/wenrexa-game-assets-1', '_blank');
    });

    this.textThree = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.5, 'Laser sounds By Triki Minut Interactive under CC');
    this.textThree.setInteractive();
    this.textThree.setOrigin(0.5);

    this.textThree.on('pointerdown', () => {
      window.open('https://www.trikiminut.com', '_blank');
    });

    this.textFour = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.6, 'Enemies ships By Carlos Alface');
    this.textFour.setInteractive();
    this.textFour.setOrigin(0.5);

    this.textFour.on('pointerdown', () => {
      window.open('http://carlosalface.blogspot.pt/', '_blank');
    });
  }
}