import express from 'express';
import dotenv from  'dotenv';
import { connectDB } from './database/db.js';
import Razorpay from 'razorpay';
import cors from 'cors';

dotenv.config({ quiet: true });

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,  
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const app = express();

const port=process.env.PORT;  

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running');
})

import userRoutes from './routes/user.js';
import courseRoutes from './routes/course.js';
import adminRoutes from './routes/admin.js';

app.use('/api', userRoutes);
app.use('/api', courseRoutes);
app.use('/api', adminRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to database, server is not starting.", error);
  }
};

startServer();