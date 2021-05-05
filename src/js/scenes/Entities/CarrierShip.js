import { Entity } from "./Entity";

export class CarrierShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemyShip0', 'CarrierShip');
    this.play('sprEnemyShip0');
    this.body.velocity.x = Phaser.Math.Between(-50, -100);
  };
};