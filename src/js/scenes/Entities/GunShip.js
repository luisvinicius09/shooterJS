// eslint-disable-next-line import/no-unresolved
import Phaser from 'phaser';
import Entity from './Entity';
import EnemyLaser from './EnemyLaser';

export default class GunShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemyShip1', 'GunShip');
    this.play('sprEnemyShip1').setScale(0.4);
    this.body.velocity.x = Phaser.Math.Between(-50, -100);
    this.shootTimer = this.scene.time.addEvent({
      delay: 2000,
      callback: () => {
        const laser = new EnemyLaser(
          this.scene,
          this.x,
          this.y,
        );
        laser.setScale(this.scaleX);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true,
    });
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}
