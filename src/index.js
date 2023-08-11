import { PORT } from './config'
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import multer from 'multer';
import bodyParser from 'body-parser';

import { connectDb } from './models';
import routes from './routes';
import { createRoles } from './utils/createRoles';
import { createSampleUsers } from './utils/createUsers';

// Start express server
connectDb()
  .then(async () => {
    // create base roles
    createRoles()
      .then(() => {
        // create sample users
        if (process.env.NODE_ENV !== 'production'){
          createSampleUsers();
        }
      });

    // multer instance
    const upload = multer();

    // Create instance of express application
    const app = express();

    // Add parser middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Parsing multipart/form-data
    app.use(upload.array());
    app.use(express.static('public'));

    // Use CORS
    app.use(cors());

    // Implements Helmet for extra security
    app.use(helmet());

    // Modular routes
    /**
     * app.use('/example', routes.example);
     */
    app.use('/users', routes.users);
    app.use('/auth', routes.auth);

    app.get(
      '/',
      (req, res) => {
        return res.status(200).send('API Live!')
      }
    );

    // Middleware for errors
    app.use((error, req, res) => {
      if (!error.statusCode) error.statusCode = 500;

      console.log(error);
      return res
        .status(error.statusCode)
        .json({ error: error.toString() });
    });

    app.listen(PORT,  () => {
      console.log(`Example app listening on port ${PORT}`);
    })
  })