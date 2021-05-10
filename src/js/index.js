import Phaser from 'phaser';
import SceneMainMenu from './scenes/SceneMainMenu';
import SceneMain from './scenes/SceneMain';
import SceneLeaderboard from './scenes/SceneLeaderboard';
import SceneGameOver from './scenes/SceneGameOver';
import ScenePause from './scenes/ScenePause';

const config = {
  type: Phaser.WEBGL,
  width: 840,
  parent: 'divId',
  height: 560,
  dom: {
    createContainer: true
},
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
    ScenePause,
  ],
  pixelArt: true,
  roundPixels: true,
};

new Phaser.Game(config);