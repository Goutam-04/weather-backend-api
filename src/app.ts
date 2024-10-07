import express from "express";
import dotenv from 'dotenv';
import weather from './routes/weather'


dotenv.config();
const app=express()
const port=process.env.PORT || 8080
app.use(express.json());

app.use('/api/',weather)

app.listen(port,()=>{console.log('port is running in port '+port);})