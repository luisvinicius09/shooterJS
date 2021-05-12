export default class SceneCredits extends Phaser.Scene {
  constructor() {
    super({
      key: 'Credits',
    });
  };

  create() {
    this.title = this.add.text(this.game.config.width * .5, this.game.config.height * .1, 'CREDITS');
  }
};