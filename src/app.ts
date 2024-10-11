import express from "express";
import dotenv from 'dotenv';
import weather from './routes/weather'
import { rateLimit } from 'express-rate-limit'




dotenv.config();
const app=express()
const port=process.env.PORT || 8080

const limiter = rateLimit({
	windowMs:  60 * 60 * 1000, // 1 hour
	limit: 50, // Limit each IP to 100 requests per `window` (here, per 1 hour).
})

app.use(express.json());
app.use(limiter)

app.use('/api/',weather)

app.listen(port,()=>{console.log('port is running in port '+port);})