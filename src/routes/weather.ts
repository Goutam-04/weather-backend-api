import axios from "axios";
import { Router, Request, Response } from "express";


const router=Router()


router.get('/weather/:city', async (req: Request, res: Response) => {
    const city=req.params.city;
    // console.log(city);
    const apiKey=process.env.WEATHER_API_KEY
    const apiUrl=`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${apiKey}&contentType=json`
    try {
      const weatherData=await axios.get(apiUrl)
      res.status(200).json(weatherData.data);
    } catch (error) {
      res.status(500).json({ message: "Error fetching weather data" });
    }
  });

export default router;