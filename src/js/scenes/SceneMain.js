import { Player } from "./Entities/Player";

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneMain',
    });
  };

  preload() {
    this.load.spritesheet('sprPlayer', './img/playerShip.png', {
      frameWidth: 478,
      frameHeight: 348,
    })
  };

  create() {
    this.anims.create({
      key: 'sprPlayer',
      frames: this.anims.generateFrameNumbers('sprPlayer'),
      frameRate: 16,
      repeat: -1,
    })

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprPlayer',
    )
  };

  update() {
    this.player.update();
  };
}