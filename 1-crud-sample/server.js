const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

module.exports = class Server {
  constructor() {
    this.app = express();
    this.cats = [];
    this.dogs = [];
  }

  loadRoutes(routes) {
    this.app.use(routes);
  }

  init() {
    this.app.locals.cats = this.cats;
    this.app.locals.dogs = this.dogs;

    this.app.use(morgan('tiny'))
    this.app.use((req, res, next) => {
      bodyParser.json({
        limit: 1024 * 1024 * 20,
        type: 'application/json'
      })(req, res, (error) => {
        if (error) {
          return respond.failure(res, error)
        }
        next()
      })
    })
    // set upload limit
    this.app.use(bodyParser.urlencoded({
      limit: 1024 * 1024 * 20,
      extended: false,
      type: 'application/x-www-form-urlencoded'
    }))
  }

  start(port, callback) {
    this.app.listen(3000, () => {
      console.log('server started on port', port);
      callback ? callback() : '';
    });
  }
}