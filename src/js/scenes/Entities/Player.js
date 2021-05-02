import { Entity } from "./Entity";

export class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');
    this.setData('speed', 100);
    this.play('sprPlayer');
    this.setData('isShooting', false);
    this.setData('timerShootDelay', 10);
    this.setData('timeShootTick', this.getData('timerShootDelay') - 1);
  };

  moveUp() {
    this.body.velocity.y = -this.getData('speed');
  };

  moveDown() {

  };

  moveLeft() {
    
  };

  moveRight() {

  };

  update() {
    this.body.setVelocity(0, 0);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.width);
  };
}

class PlayerLaser extends Entity {
  constructor() {
    super();
  }
}