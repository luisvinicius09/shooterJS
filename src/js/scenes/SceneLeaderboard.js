export default class SceneLeaderboard extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneLeaderboard',
    });
  };

  preload() {

  };

  create() {
    this.title = this.add.text(this.game.config.width * .5, 128, 'LEADERBOARD', {
      fontFamily: 'monospace',
      fontSize: 60,
      fontStyle: 'bold',
      color: '#fff',
      align: 'center',
    });
    this.title.setOrigin(.5);


    this.btnMenu = this.add.sprite({

    })
    this.btnMenu.setInteractive();

    
  };

  update() {

  };
}