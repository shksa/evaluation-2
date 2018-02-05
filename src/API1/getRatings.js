const Hapi = require('hapi');
const request = require('request');

const server = new Hapi.Server();
server.connection({ port: 8004, host: 'localhost' });
// const api1 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks';
const api2 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/';

server.route({
  path: '/{id}',
  method: 'GET',
  handler: (req, reply) => {
    // let responseJSON;
    const url = api2 + req.params.id;
    request.get(url, (error, response, body) => {
      const json = JSON.parse(body);
      // console.log(json);
      reply(json);
    });
  },
});
//
// server.start((err) => {
//   console.log(err);
//   console.log('Server running at:', server.info.uri);
// });

module.exports = server;
