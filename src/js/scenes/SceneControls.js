export default class SceneControls extends Phaser.Scene {
  constructor() {
    super({
      key: 'Controls',
    });
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver', { volume: 0.3 }),
      btnDown: this.sound.add('sndBtnDown', { volume: 0.3 }),
    };

    this.btnMenu = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.1,
      'sprBtnMenu',
    );
    this.btnMenu.setInteractive();

    this.btnMenu.on('pointerover', () => {
      this.btnMenu.setTexture('sprBtnMenuHover');
      this.sfx.btnOver.play();
    });

    this.btnMenu.on('pointerout', () => {
      this.btnMenu.setTexture('sprBtnMenu');
    });

    this.btnMenu.on('pointerdown', () => {
      this.btnMenu.setTexture('sprBtnMenuDown');
      this.sfx.btnDown.play();
    });

    this.btnMenu.on('pointerup', () => {
      this.btnMenu.setTexture('sprBtnMenu');
      this.scene.start('SceneMainMenu');
    });

    this.title = this.add.text(this.game.config.width * 0.5, 100, 'CONTROLS', {
      fontFamily: 'monospace',
      fontSize: 40,
      fontStyle: 'bold',
      color: '#fff',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    this.description = this.add.text(this.game.config.width * 0.5, 128, 'This are instructions to play the game!');
    this.description.setOrigin(0.5);

    this.objective = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.3, 'OBJECTIVE: \nThe objective of the game is to destroy the biggest number of enemy ships.');
    this.objective.setOrigin(0.5);

    this.shoot = this.add.text(this.game.config.width * 0.34, this.game.config.height * 0.4, 'SHOOT: \nTo shoot you just need to press the SPACE bar.');
    this.shoot.setInteractive();
    this.shoot.setOrigin(0.5);

    this.shoot = this.add.text(
      this.game.config.width * 0.08,
      this.game.config.height * 0.5,
      `CONTROL THE SHIP: \nYou need to use the arrows from your keyboard... 
      \n     Arrow UP: Ship goes up \n     Arrow DOWN: Ship goes down 
      \n     Arrow LEFT: Ship goes left \n     Arrow RIGHT: Ship goes right`,
    );
  }
}