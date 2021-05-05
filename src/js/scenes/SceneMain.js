import { ChaserTrap } from './Entities/ChaserTrap';
import { GunShip } from './Entities/GunShip';
import { Player } from './Entities/Player';
import { CarrierShip } from './Entities/CarrierShip';

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
    
    this.load.image('sprLaser1', './img/playerLaser1.png');

    this.load.spritesheet('sprEnemyShip0', './img/enemyShip0.png', {
      frameWidth: 92,
      frameHeight: 142,
    });

    this.load.spritesheet('sprEnemyShip1', './img/enemyShip1.png', {
      frameWidth: 106,
      frameHeight: 145,
    });

    this.load.image('sprEnemyTrap', './img/enemyTrap.png');

    this.load.image('sprEnemyLaser', './img/enemyLaser.png');

    this.load.audio('sndLaser', './audio/laserfire02.ogg');
    this.load.audio('sndExplosion', './audio/explosion1.wav');
  };

  create() {    
    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.anims.create({
      key: 'sprPlayer',
      frames: this.anims.generateFrameNumbers('sprPlayer'),
      frameRate: 16,
      repeat: -1,
    });

    this.anims.create({
      key:'sprEnemyShip0',
      frames: this.anims.generateFrameNumbers('sprEnemyShip0'),
      frameRate: 16,
      repeat: -1,
    });

    this.anims.create({
      key:'sprEnemyShip1',
      frames: this.anims.generateFrameNumbers('sprEnemyShip1'),
      frameRate: 16,
      repeat: -1,
    });

    this.sfx = {
      explosions: [
        this.sound.add('sndExplosion', { volume: 0.5 }),
      ],
      laser: this.sound.add('sndLaser', { volume: 0.2 }),
    };

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprPlayer',
    );

    this.player.setScale(.2);

    this.playerLasers = this.add.group();
    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();


    this.time.addEvent({
      delay: 1000,
      callback: () => {
        let enemy = null;
        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this,
            this.game.config.width,
            Phaser.Math.Between(0, this.game.config.height),
          );
          enemy.setScale(.4);
          enemy.setAngle(90);
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType('ChaserTrap').length < 5) {
            enemy = new ChaserTrap(
              this,
              this.game.config.width,
              Phaser.Math.Between(0, this.game.config.height),
            );
            enemy.setScale(0.2);
          }
        } else {
          enemy = new CarrierShip(
            this,
            this.game.config.width,
            Phaser.Math.Between(0, this.game.config.height)
          );
          enemy.setScale(0.8);
          enemy.setAngle(90);
        }
        this.enemies.add(enemy);
      },
      callbackScope: this,
      loop: true,
    });
  };

  update() {
    this.player.update();

    if (this.keyUp.isDown) {
      this.player.moveUp();
    }

    if (this.keyDown.isDown) {
      this.player.moveDown();
    }

    if (this.keyLeft.isDown) {
      this.player.moveLeft();
    }

    if (this.keyRight.isDown) {
      this.player.moveRight();
    }

    if (this.keySpace.isDown) {
      this.player.setData('isShooting', true);
    } else {
      this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
      this.player.setData('isShooting', false);
    }
  };

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i++) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') == type) {
        arr.push(enemy);
      }
    };
    return arr;
  };
};