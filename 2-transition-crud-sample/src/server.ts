import express, { RequestHandler } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import Cat from './models/cat';

export default class Server {
  app: express.Express
  cats: Cat[]
  dogs: any[]

  constructor() {
    this.app = express();
    this.cats = [];
    this.dogs = [];
  }

  loadRoutes(routes: RequestHandler) {
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
          return res.status(400).send(error)
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

  start(port: number, callback?: () => any) {
    this.app.listen(3000, () => {
      console.log('server started on port', port);
      callback ? callback() : '';
    });
  }
}