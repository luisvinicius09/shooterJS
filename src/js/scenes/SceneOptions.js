export default class SceneOptions extends Phaser.Scene {
  constructor() {
    super({
      key: 'Options',
    });
  }

  create() {
    this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.1, 'OPTIONS');
  }
}