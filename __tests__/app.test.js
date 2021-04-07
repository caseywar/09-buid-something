const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Setlist = require('../lib/models/Setlist')

describe('. routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  let setlist;
  beforeEach(async () => {
    setlist = await Setlist.insert({ track: 'train junkie', artist: 'greensky bluegrass', timesPlayed: 200 });
  });


  it('creates a new entry on the setlist with POST', () => {
    return request(app)
    .post('/api/v1/setlists')
    .send({ track: 'train junkie', artist: 'greensky bluegrass', timesPlayed: 200 })
    .then((res) => {
      expect(res.body).toEqual({
        id: expect.any(String),
        track: 'train junkie', 
        artist: 'greensky bluegrass', 
        timesPlayed: 200
      });
    });
  })

  
  it('gets a list of entries from the setlist with GET', async () => {
    
    const setlist = await Promise.all([
      Setlist.insert({ track: 'train junkie 2', artist: 'greensky bluegrass', timesPlayed: 200 }),
      Setlist.insert({ track: 'all for money', artist: 'greensky bluegrass', timesPlayed: 90 }),
      Setlist.insert({ track: 'king of the hill', artist: 'greensky bluegrass', timesPlayed: 40 }),
    ])

    return request(app)
    .get('/api/v1/setlists')
    .then((res) => {
      expect(res.body).toEqual(expect.arrayContaining(setlist));
    });
  })



  it('gets one entry of the setlist by id', async () => {
    const res = await request(app)
    .get('/api/v1/setlists');
    expect(res.body).toEqual([{
      id: '1',
      track: 'train junkie', 
      artist: 'greensky bluegrass', 
      timesPlayed: 200
    }])
  })

});
