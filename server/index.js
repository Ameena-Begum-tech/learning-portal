import express from 'express';
import dotenv from  'dotenv';
import { connectDB } from './database/db.js';

dotenv.config();

const app = express();

const port=process.env.PORT;



app.get('/', (req, res) => {
  res.send('Server is running');
})

import userRoutes from './routes/user.js';
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
   connectDB();
});