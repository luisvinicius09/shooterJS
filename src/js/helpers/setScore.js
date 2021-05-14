const axios = require('axios');

const gameId = '7LB4DVqRjgyTZD1s38uU';

const setScore = (userName = 'User', score = 10) => {
  axios.post(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`, {
    user: userName,
    score: score,
  })
  .then((res) => {
    
  })
  .catch((err) => {
    return err;
  })
};

module.exports = setScore;