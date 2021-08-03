import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
// get config vars
dotenv.config();
import { Routes } from './routes';
import cloudinaryV2 from './cloudinary.config';

// import * as multer from 'multer';

// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.filename + '-' + file.orig)
//   }
// })

createConnection()
  .then(async (connection) => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    // app.use(multer({ dest: 'images' }).single('image'));

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
    app.listen(4000);

    // insert new users for test
    // await connection.manager.save(
    //     connection.manager.create(User, {
    //       firstName: 'Timber',
    //       lastName: 'Saw',
    //       age: 27,
    //     }),
    // );
    // await connection.manager.save(
    //     connection.manager.create(User, {
    //       firstName: 'Phantom',
    //       lastName: 'Assassin',
    //       age: 24,
    //     }),
    // );

    console.log(
      'Express server has started on port 3000. Open http://localhost:3000/users to see results',
    );
  })
  .catch((error) => console.log(error));
