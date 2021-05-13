import Phaser from 'phaser';
import ScenePreloader from './scenes/ScenePreloader';
import SceneBoot from './scenes/SceneBoot';
import SceneOptions from './scenes/SceneOptions';
import SceneCredits from './scenes/SceneCredits';
import SceneControls from './scenes/SceneControls';
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
    createContainer: true,
  },
  backgroundColor: 'black',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [
    SceneBoot,
    ScenePreloader,
    SceneMainMenu,
    SceneCredits,
    SceneControls,
    SceneOptions,
    SceneMain,
    SceneLeaderboard,
    SceneGameOver,
    ScenePause,
  ],
  pixelArt: true,
  roundPixels: true,
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);