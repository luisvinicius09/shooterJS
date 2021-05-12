export default class SceneBoot extends Phaser.Scene {
  constructor() {
    super({
      key: 'Boot'
    });
  };
  
  preload() {
    // this.load.image('logo', './img/shooter_logo.png');
  };

  create() {
    this.scene.start('Preloader');
  };
};