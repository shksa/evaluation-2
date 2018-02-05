const Hapi = require('hapi');
const request = require('request');

const server = new Hapi.Server();
server.connection({ port: 8004, host: 'localhost' });
const url = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks';

server.route({
  path: '/getBooks',
  method: 'GET',
  handler: (req, reply) => {
    // let responseJSON;
    request.get(url, (error, response, body) => {
      const json = JSON.parse(body);
      console.log(json);
      reply(JSON.stringify(json));
    });
  },
});

server.start((err) => {
  console.log(err);
  console.log('Server running at:', server.info.uri);
});

module.exports = server;
