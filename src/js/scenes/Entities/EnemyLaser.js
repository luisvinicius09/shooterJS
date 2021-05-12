import Entity from "./Entity";

export default class EnemyLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemyLaser');
    this.body.velocity.x = -200;
  }
}