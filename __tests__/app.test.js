const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('. routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new entry on the setlist with POST', () => {
    return request(app)
    .post('/api/v1/setlists')
    .send({ track: 'train junkie', artist: 'greensky bluegrass', timesPlayed: 200 })
    .then((res) => {
      expect(res.body).toEqual({
        id: '1',
        track: 'train junkie', 
        artist: 'greensky bluegrass', 
        timesPlayed: 200
      });
    });
  })
});
