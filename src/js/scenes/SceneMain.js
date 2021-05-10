import { ChaserTrap } from './Entities/ChaserTrap';
import { GunShip } from './Entities/GunShip';
import { Player } from './Entities/Player';
import { CarrierShip } from './Entities/CarrierShip';
import { ScrollingBackground } from './utils/ScrollingBackground'
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
    });
    
    this.load.image('sprLaser1', './img/playerLaser1.png');

    this.load.spritesheet('sprExplosion', './img/explosion.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

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
    
    this.load.image('sprBg0', './img/background.png');
    this.load.image('sprBg1', './img/sprBg1.png');
    this.load.image('sprBg2', './img/sprBg2.png');
  };

  create() {    
    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

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

    this.anims.create({
      key: 'sprExplosion',
      frames: this.anims.generateFrameNumbers('sprExplosion'),
      frameRate: 20,
      repeat: 0,
    });


    this.sfx = {
      explosions: [
        this.sound.add('sndExplosion', { volume: 0.5 }),
      ],
      laser: this.sound.add('sndLaser', { volume: 0.2 }),
    };


    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      let bg = new ScrollingBackground(this, 'sprBg1', -(i * 9));
      this.backgrounds.push(bg);
    }

    let bg = this.add.sprite(0, 0, 'sprBg0');
    bg.setDepth(-10);

    this.player = new Player(
      this,
      this.game.config.width * 0.1,
      this.game.config.height * 0.5,
      'sprPlayer',
    );

    this.player.setScale(.13);

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
        };

        if (enemy !== null) {
          this.enemies.add(enemy);
        };
      },
      callbackScope: this,
      loop: true,
    });

    let score = 0;
    let scoreText;

    scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      fill: '#fff',
    });

    this.physics.add.collider(this.playerLasers, this.enemies, (playerLaser, enemy) => {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
        enemy.explode(true);
        playerLaser.destroy();
        score += 10;
        scoreText.setText('Score: ' + score);
      }
    });

    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead') && !enemy.getData('isDead')) {
        player.explode(false);
        player.onDeath(score);
        enemy.explode(true);
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, (player, laser) => {
      if (!player.getData('isDead') && !laser.getData('isDead')) {
        player.explode(false);
        player.onDeath(score);
        laser.destroy();
      }
    });
  };

  update() {
    if (!this.player.getData('isDead')) {
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
    }

    if (this.keyEsc.isDown) {
      this.scene.launch('ScenePause');
      this.scene.pause();
    }

     for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      let enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (enemy.x < -enemy.displayWidth * 4||
          enemy.x > this.game.config.width + enemy.displayWidth ||
          enemy.y < -enemy.displayHeight ||
          enemy.y > this.game.config.height + enemy.displayHeight
        ) {
          if (enemy) {
            if (enemy.onDestroy !== undefined) {
              enemy.onDestroy();
            }

            enemy.destroy();
          }
      };
    };

    for (let i = 0; i < this.enemyLasers.getChildren().length; i += 1) {
      let laser = this.enemyLasers.getChildren()[i];

      laser.update();

      if(laser.x < -laser.displayWidth ||
         laser.x > this.game.config.width + laser.displayWidth ||
         laser.y < -laser.displayHeight ||
         laser.y > this.game.config.height + laser.displayHeight
        ) {
          if (laser) {
            laser.destroy();
          }
      }
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