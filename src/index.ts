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
import { ChatService } from './service/ChatService';
import { SaleService } from './service/SaleService';

createConnection()
  .then(async (connection) => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const chatService = new ChatService();
    const saleService = new SaleService();
    const server = http.createServer(app);
    const io = new Server(server, {
      cors: {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket: any) => {
      console.log('Connected');

      socket.on('chat message', ({ from, to, message }) => {
        console.log('Logging chat messages', { from, to, message });
        io.emit('chat message', {
          from,
          to,
          message,
          createdAt: new Date().toISOString(),
          new: true,
        });
        chatService.create({ from, to, message });
      });

      socket.on('add sale', async ({ from, sale }) => {
        console.log('Logging add sale socket...', { from, sale });
        const create = await saleService.create({ from, sale });
        if (create.error) {
          io.emit('add sale', create);
        } else {
          io.emit('add sale', {
            from,
            sale: { ...sale, id: create.id, new: true },
          });
        }
      });

      socket.on('delete sale', async ({ from, sale }) => {
        console.log('Loging delete sale socket...', { from, sale });
        //  'from' here is salemanager ID
        const deleted = await saleService.delete(sale, from);
        if (deleted.error) {
          io.emit('delete sale', deleted);
        } else {
          io.emit('delete sale', { from, id: sale });
        }
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
              .catch((error) => console.log(error));
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
