const Hapi = require('hapi');
const request = require('request');

const server = new Hapi.Server();
server.connection({ port: 8004, host: 'localhost' });
const api1 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks';
const api2 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/';

let output;
request.get(api1, (error, response, body) => {
  const json = JSON.parse(body);
  const { books } = json;
  const jkBooks = [];
  const sidneyBooks = [];
  books.forEach((book) => {
    const { id } = book;
    const url = api2 + id;
    request.get(url, (error1, response1, body1) => {
      const ratingJson = JSON.parse(body1);
      const { rating } = ratingJson;
      book.rating = rating;
    });

    if (book.Author === 'J K Rowling') {
      jkBooks.push(book);
    } else {
      sidneyBooks.push(book);
    }
  });
  output = { 'J K Rowling': jkBooks, 'Sidney Sheldon': sidneyBooks };
});

server.route({
  path: '/getBooks',
  method: 'GET',
  handler: (req, reply) => {
    // let responseJSON;
    reply(output);
  },
});

server.start((err) => {
  console.log(err);
  console.log('Server running at:', server.info.uri);
});

module.exports = server;
