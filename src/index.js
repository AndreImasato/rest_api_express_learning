import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models, { connectDb } from './models';
import routes from './routes';

// Create instance of express application
const app = express();

// Add parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use CORS
app.use(cors());

// Modular routes
/**
 * app.use('/example', routes.example);
 */

// Middleware for errors
app.use((error, req, res) => {
  if (!error.statusCode) error.statusCode = 500;

  
  return res
    .status(error.statusCode)
    .json({ error: error.toString() });
});

// Start express server
connectDb()
  .then(async () => {
    app.listen(process.env.PORT,  () => {
      console.log(`Example app listening on port ${process.env.PORT}`);
    })
  })