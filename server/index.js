import express from 'express';
import dotenv from  'dotenv';
import { connectDB } from './database/db.js';

dotenv.config();

const app = express();
const port=process.env.PORT ;

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
   connectDB();
});