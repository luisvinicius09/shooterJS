// eslint-disable-next-line import/no-unresolved
const axios = require('axios');

const gameId = '7LB4DVqRjgyTZD1s38uU';

const getScore = () => {
  axios.get(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`)
    .then((res) => res.data.result)
    .catch((err) => err);
};

module.exports = getScore;