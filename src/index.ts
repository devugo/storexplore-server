import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
const http = require('http');
import * as SocketIO from 'socket.io';
const { Server } = SocketIO;
// get config vars
dotenv.config();
import { Routes } from './routes';

createConnection()
  .then(async (connection) => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const server = http.createServer(app);
    const io = new Server(server, {
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket: any) => {
      console.log('Connected');
      console.log('a User connected');

      socket.on('chat message', ({ from, to, message }) => {
        console.log({ from, to, message });
        io.emit('chat message', message);
      });
    });

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        route.middleware
          ? route.middleware
          : (_req, _res, next) => {
              next();
            },
        ...route.validation,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next,
          );
          if (result instanceof Promise) {
            result
              .then((result) =>
                result !== null && result !== undefined
                  ? res.send(result)
                  : undefined,
              )
              .catch((error) => console.log('ROuting error found,,,'));
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        },
      );
    });

    // setup express app here
    // ...

    // start express server
    server.listen(4000);

    console.log(
      'Express server has started on port 4000. Open http://localhost:4000 to begin',
    );
  })
  .catch((error) => console.log(error));
