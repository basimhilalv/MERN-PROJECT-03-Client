import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log('DB Connected');
}).catch((err)=>{
    console.log(err);
})

const app = express();

app.listen(3000, ()=>{
    console.log('Server is running on 3000');
})

app.use(express.json());
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);