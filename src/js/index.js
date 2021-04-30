import Phaser from 'phaser';
import SceneMainMenu from './scenes/ScenMainMenu';
import SceneMain from './scenes/SceneMain';
import SceneLeaderboard from './scenes/SceneLeaderboard';
import SceneGameOver from './scenes/SceneGameOver';

const config = {
  type: Phaser.WEBGL,
  width: 480,
  height: 640,
  backgroundColor: 'black',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [
    SceneMainMenu,
    SceneMain,
    SceneLeaderboard,
    SceneGameOver,
  ],
  pixelArt: true,
  roundPixels: true,
};

new Phaser.Game(config);