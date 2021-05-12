import { ScrollingBackground } from "./utils/ScrollingBackground";

export default class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneMainMenu',
    });
  };

  create() {
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver', { volume: 0.3 }),
      btnDown: this.sound.add('sndBtnDown', { volume: 0.3 }),
    };

    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.4,
      'sprBtnPlay',
    );
    this.btnPlay.setInteractive();

    this.btnPlay.on('pointerover', () => {
      this.btnPlay.setTexture('sprBtnPlayHover');
      this.sfx.btnOver.play();
    });

    this.btnPlay.on('pointerout', () => {
      this.btnPlay.setTexture('sprBtnPlay');
    });

    this.btnPlay.on('pointerdown', () => {
      this.btnPlay.setTexture('sprBtnPlayDown');
      this.sfx.btnDown.play();      
    });

    this.btnPlay.on('pointerup', () => {
      this.btnPlay.setTexture('sprBtnPlay');
      this.scene.start('SceneMain');
    });

    this.title = this.add.text(this.game.config.width * .5, 128, 'SHOOTERJS', {
      fontFamily: 'monospace',
      fontSize: 60,
      fontStyle: 'bold',
      color: '#fff',
      align: 'center',
    });
    this.title.setOrigin(.5);

    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      let bg = new ScrollingBackground(this, 'sprBg1', -(i * 10));
      this.backgrounds.push(bg);
    }

    let bg = this.add.sprite(0, 0, 'sprBg0');
    bg.setDepth(-10);

    this.btnLeaderboard = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprBtnLeaderboard'
    )
    this.btnLeaderboard.setInteractive();

    this.btnLeaderboard.on('pointerover', () => {
      this.btnLeaderboard.setTexture('sprBtnLeaderboardHover');
      this.sfx.btnOver.play();
    });

    this.btnLeaderboard.on('pointerout', () => {
      this.btnLeaderboard.setTexture('sprBtnLeaderboard');
    });

    this.btnLeaderboard.on('pointerdown', () => {
      this.btnLeaderboard.setTexture('sprBtnLeaderboardDown');
      this.sfx.btnDown.play();
    });

    this.btnLeaderboard.on('pointerup', () => {
      this.scene.start('SceneLeaderboard');
    });


    this.btnOptions = this.add.sprite(
      this.game.config.width *.5,
      this.game.config.height *.6,
    );


    this.btnCredits = this.add.sprite(
      this.game.config.width * .5,
      this.game.config.height * .6,
      'sprBtnCredits'
    );
    this.btnCredits.setInteractive();

    this.btnCredits.on('pointerover', () => {
      this.btnCredits.setTexture('sprBtnCreditsHover');
      this.sfx.btnOver.play();
    });

    this.btnCredits.on('pointerout', () => {
      this.btnCredits.setTexture('sprBtnCredits');
    });

    this.btnCredits.on('pointerdown', () => {
      this.btnCredits.setTexture('sprBtnCreditsDown');
      this.sfx.btnDown.play();
    });

    this.btnCredits.on('pointerup', () => {
      this.scene.start('SceneCredits');
    });


  };


  update() {
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  };
}