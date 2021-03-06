const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');
const playStore = require('../playstore');

describe('Playstore App', () => {
  it('GET /apps should return 200', () => {
    return request(app)
      .get('/apps')
      .expect(200);
  });
  it('GET /apps?genres should return 400 if key is not valid', () => {
    return request(app)
      .get('/apps?genres=notvalid')
      .expect(400);
  })
  it('GET /apps?genres=action should return 200 if key is valid', () => {
    return request(app)
      .get('/apps?genres=action')
      .expect(200);
  })
  it('GET /apps?genres=action&sort=app should return 200', () => {
    return request(app)
      .get('/apps?genres=action&sort=app')
      .expect(200);
  })
});