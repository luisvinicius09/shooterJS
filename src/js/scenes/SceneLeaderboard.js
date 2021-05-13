import Phaser from 'phaser';
import axios from 'axios';

const COLOR_PRIMARY = 0x8ca0ab;
const COLOR_LIGHT = 0x9badb7;
const COLOR_DARK = 0x7d94a1;

const gameId = 'BX3P0HU4Xq0E2i101khR';
export default class SceneLeaderboard extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneLeaderboard',
    });
    this.scores;
  }

  preload() {
    this.load.scenePlugin({
      key: 'rexuiplugin',
      url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      sceneKey: 'rexUI',
    });
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver', { volume: 0.3 }),
      btnDown: this.sound.add('sndBtnDown', { volume: 0.3 }),
    };

    this.title = this.add.text(this.game.config.width * 0.5, 100, 'LEADERBOARD', {
      fontFamily: 'monospace',
      fontSize: 60,
      fontStyle: 'bold',
      color: '#fff',
      align: 'center',
    });
    this.title.setOrigin(0.5);

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

    const tabs = this.rexUI.add.tabs({
      x: this.game.config.width * 0.5,
      y: this.game.config.height * 0.6,
      panel: this.rexUI.add.gridTable({
        background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_PRIMARY),
        table: {
          width: 301,
          height: 370,
          cellWidth: 150,
          cellHeight: 60,
          columns: 2,
          mask: {
            padding: 2,
          },
        },
        slider: {
          track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK),
          thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
        },
        createCellContainerCallback: (cell) => {
          const {
            scene, width, height, item
          } = cell;
          return scene.rexUI.add.label({
            width,
            height,
            background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0)
              .setStrokeStyle(2, COLOR_DARK),
            icon: scene.add.text(0, 0, item.user),
            text: scene.add.text(0, 0, item.score),
            space: {
              icon: 10,
              left: 15,
            },
          });
        },
      }),
    }).layout();

    this.loading = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.5, 'Loading...');
    this.loading.setOrigin(0.5);

    axios.get(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`)
      .then((res) => {
    this.loading.destroy();
    const response = res.data.result;
    response.sort((a, b) => b.score - a.score);
    tabs.getElement('panel').setItems(response).scrollToTop();
      });
  }
}
