// const Server = require('./index.js');
const expected = require('./sampleResponse');
const request = require('request');

describe('test is server is fetching data', () => {
  test('testing if server produces correct response', (done) => {
    request.get('http://localhost:8004/getBooks', (error, response, body) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });
  test('testing if server produces non-empty response', (done) => {
    request.get('http://localhost:8004/getBooks', (error, response, body) => {
      expect(body.length).not.toBe(0);
      done();
    });
  });
  test('testing if server produces correct response', (done) => {
    request.get('http://localhost:8004/getBooks', (error, response, body) => {
      const json = JSON.parse(body);
      expect(json).toEqual(expected);
      done();
    });
  });
});
