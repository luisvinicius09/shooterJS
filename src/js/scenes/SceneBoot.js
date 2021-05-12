export default class SceneBoot extends Phaser.Scene {
  constructor() {
    super({
      key: 'Boot'
    });
  };

  create() {
    this.scene.start('Preloader');
  };
};