const setScore = require('../src/js/helpers/setScore');

jest.mock('../src/js/helpers/setScore');

describe('Testing the post functionality', () => {
  it('Should save the score into the API', async () => {
    setScore.mockResolvedValue({
      result: 'Leaderboard score created correctly.',
    });
    const success = await setScore('Dung', 50000);
    expect(success.result).toMatch('Leaderboard score created correctly.');
  });
});