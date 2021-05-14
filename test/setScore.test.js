const setScore = require('../src/js/helpers/setScore');

jest.mock('../src/js/helpers/setScore');

describe('Testing the post functionality', () => {
  it('Should save the score into the API with filled fields', () => {
    setScore.mockResolvedValue({
      result: 'Leaderboard score created correctly.',
    });
    setScore('Test', 4000)
      .then((data) => {
        expect(data.result).toMatch('Leaderboard score created correctly.');
      });
  });

  it('Should not save the score into the API with empty score', () => {
    setScore.mockResolvedValue({
      result: 'You need to provide a valid score for the leaderboard',
    });
    setScore('Test', '')
      .then((data) => {
        expect(data.result).toMatch('You need to provide a valid score for the leaderboard');
      });
  });
});