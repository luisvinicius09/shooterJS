import Entity from './Entity';

export default class PlayerLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprLaser1');
    this.body.velocity.x = 200;
  }
}