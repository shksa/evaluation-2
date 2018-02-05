const Hapi = require('hapi');
const request = require('request');
const Models = require('../../models');

Models.books.destroy({ truncate: true });
const server = new Hapi.Server();
server.connection({ port: 8004, host: 'localhost' });
const api1 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks';
const api2 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/';

function putInDB(jsonOutput) {
  console.log('IN putInDB', jsonOutput);
  const jkBooks = jsonOutput['J K Rowling'];
  const sidneyBooks = jsonOutput['Sidney Sheldon'];

  jkBooks.forEach((book) => {
    Models.books.create({
      author: book.Author,
      idd: book.id,
      name: book.Name,
      rating: book.rating,
    }).then(console.log('success jk'));
  });

  sidneyBooks.forEach((book) => {
    Models.books.create({
      author: book.Author,
      idd: book.id,
      name: book.Name,
      rating: book.rating,
    }).then(console.log('success sidney'));
  });
}

const promise = new Promise((fulfill, reject) => {
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
    fulfill(output);
  });
});

let globalOutput;
promise.then((output) => {
  globalOutput = output;
  return output;
}).then(output => putInDB(output));


server.route([
  {
    path: '/getBooks',
    method: 'GET',
    handler: (req, reply) => {
    // let responseJSON;
      reply(globalOutput);
    },
  },
  {
    path: '/getRecords',
    method: 'GET',
    handler: (req, reply) => {
    // console.log(request.payload);
      Models.books.findAll().then((data) => {
        reply(data);
      });
    },
  },
]);

server.start((err) => {
  console.log(err);
  console.log('Server running at:', server.info.uri);
});
module.exports = server;
