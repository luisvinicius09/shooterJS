const getScore = require('../src/js/helpers/getScore');

jest.mock('../src/js/helpers/getScore');

describe('Testing the retrieve functionality', () => {
  it('Returns the third user name', () => {
    getScore.mockResolvedValue({
      result: [{
        user: 'David Jack',
        score: 20,
      },
      {
        user: 'Roman Pierce',
        score: 1230,
      },
      {
        user: 'Pierre Paul',
        score: 2410,
      },
      {
        user: 'Jason Lucas',
        score: 910,
      },
      ],
    });
    getScore()
    .then((data) => {
      expect(data.result[2].user).toMatch('Pierre Paul');
    });
  });

  it('Returns the second user name', async () => {
    getScore.mockResolvedValue({
      result: [{
        user: 'David Jack',
        score: 20,
      },
      {
        user: 'Roman Pierce',
        score: 1230,
      },
      {
        user: 'Pierre Paul',
        score: 2410,
      },
      {
        user: 'Jason Lucas',
        score: 910,
      },
      ],
    });
    getScore()
    .then((data) => {
      expect(data.result[1].user).toMatch('Roman Pierce')
    });
  });
});