const axios = require('axios');

const gameId = '7LB4DVqRjgyTZD1s38uU';

const getScore = () => {
  axios.get(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`)
  .then((res) => {
    return res.data.result;
  })
  .catch((err) => {
    return err;
  });
};

module.exports = getScore;