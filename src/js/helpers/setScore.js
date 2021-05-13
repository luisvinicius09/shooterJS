// import axios from 'axios';
const axios = require('axios');

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/7LB4DVqRjgyTZD1s38uU/scores/';

const setScore = (playerName = '', gameScore = 0) => {
  const info = {
    user: playerName,
    score: gameScore,
  };
  try {
    axios.post(url, info)
    .then((data) => {
      console.log(data);
    })
  } catch (err) {
    return err;
  }
};
setScore('Test', 30);

// export const getScore = async () => {
//   try {
//     const response = await fetch(url, {
//       mode: 'cors',
//     });
//     const data = await response.json();
//     return data.result;
//   } catch (e) {
//   }
// };