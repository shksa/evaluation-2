const Server = require('./index.js');

describe('test is server is fetching data', () => {
  const options = {
    method: 'GET',
    url: '/getBooks',
  };
  test('testing if response status code is 200', (done) => {
    Server.inject(options, (response) => {
      console.log('got response');
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('testing if server gets a response', (done) => {
    Server.inject(options, (response) => {
      console.log('got data as response');
      expect(response.result.length).not.toBe(0);
      done();
    });
  });
});
