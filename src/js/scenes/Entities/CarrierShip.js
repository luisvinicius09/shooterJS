// eslint-disable-next-line import/no-unresolved
import Phaser from 'phaser';
import Entity from './Entity';

export default class CarrierShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemyShip0', 'CarrierShip');
    this.play('sprEnemyShip0').setScale(0.8);
    this.body.velocity.x = Phaser.Math.Between(-50, -100);
  }
}