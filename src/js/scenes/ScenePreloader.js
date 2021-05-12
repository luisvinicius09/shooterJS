export default class ScenePreloader extends Phaser.Scene {
  constructor() {
    super({
      key: 'Preloader',
    });
  }

  preload() {
    const { width, height } = this.game.config;

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, .8);
    progressBox.fillRect(260, 270, 320, 50);

    const loadingText = this.make.text({
      x: width * 0.5,
      y: height * 0.5 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#fff',
      },
    });
    loadingText.setOrigin(0.5);

    const percentText = this.make.text({
      x: width * 0.5,
      y: height * 0.5 + 15,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(.5);

    const assetText = this.make.text({
      x: width * 0.5,
      y: height * 0.5 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5);

    this.load.on('progress', (value) => {
      percentText.setText(parseInt(value * 100, 10) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(270, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      // progressBar.destroy();
      // progressBox.destroy();
      // loadingText.destroy();
      // percentText.destroy();
      // assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // Loading assets
    this.load.spritesheet('sprPlayer', './img/playerShip.png', {
      frameWidth: 478,
      frameHeight: 348,
    });

    this.load.image('sprLaser1', './img/playerLaser1.png');

    this.load.spritesheet('sprExplosion', './img/explosion1.png', {
      frameWidth: 50,
      frameHeight: 50,
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

    this.load.image('sprBtnResume', './img/buttons/sprBtnResume.png');
    this.load.image('sprBtnResumeHover', './img/buttons/sprBtnResumeHover.png');
    this.load.image('sprBtnResumeDown', './img/buttons/sprBtnResumeDown.png');
    this.load.image('sprBtnMenu', './img/buttons/sprBtnMenu.png');
    this.load.image('sprBtnMenuHover', './img/buttons/sprBtnMenuHover.png');
    this.load.image('sprBtnMenuDown', './img/buttons/sprBtnMenuDown.png');

    this.load.image('sprBtnPlay', './img/buttons/sprBtnPlay.png');
    this.load.image('sprBtnPlayHover', './img/buttons/sprBtnPlayHover.png');
    this.load.image('sprBtnPlayDown', './img/buttons/sprBtnPlayDown.png');
    this.load.image('sprBtnRestart', './img/buttons/sprBtnRestart.png');
    this.load.image('sprBtnRestartHover', './img/buttons/sprBtnRestartHover.png');
    this.load.image('sprBtnRestartDown', './img/buttons/sprBtnRestartDown.png');
    this.load.image('sprBtnLeaderboard', './img/buttons/sprBtnLeaderboard.png');
    this.load.image('sprBtnLeaderboardHover', './img/buttons/sprBtnLeaderboardHover.png');
    this.load.image('sprBtnLeaderboardDown', './img/buttons/sprBtnLeaderboardDown.png');

    this.load.image('sprBtnSave', './img/buttons/sprBtnSave.png');
    this.load.image('sprBtnSaveHover', './img/buttons/sprBtnSaveHover.png');
    this.load.image('sprBtnSaveDown', './img/buttons/sprBtnSaveDown.png');
    this.load.image('sprBtnRestart', './img/buttons/sprBtnRestart.png');
    this.load.image('sprBtnRestartHover', './img/buttons/sprBtnRestartHover.png');
    this.load.image('sprBtnRestartDown', './img/buttons/sprBtnRestartDown.png');

    this.load.image('sprBtnCredits', './img/buttons/sprBtnCredits.png');
    this.load.image('sprBtnCreditsHover', './img/buttons/sprBtnCreditsHover.png');
    this.load.image('sprBtnCreditsDown', './img/buttons/sprBtnCreditsDown.png');

    this.load.image('sprBtnControls', './img/buttons/sprBtnControls.png');
    this.load.image('sprBtnControlsHover', './img/buttons/sprBtnControlsHover.png');
    this.load.image('sprBtnControlsDown', './img/buttons/sprBtnControlsDown.png');

    this.load.audio('sndBtnOver', './audio/buttons/sndBtnOver.wav');
    this.load.audio('sndBtnDown', './audio/buttons/sndBtnDown.wav');
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('SceneMainMenu');
    }
  }
}