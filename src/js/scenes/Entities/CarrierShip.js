import { Entity } from "./Entity";

export class CarrierShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemyShip0', 'CarrierShip');
    this.play('sprEnemyShip0').setScale(0.8);
    this.body.velocity.x = Phaser.Math.Between(-50, -100);
  };
};