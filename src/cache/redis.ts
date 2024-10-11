import Redis from "ioredis";

const client = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');


const getWeatherData=async (key:string): Promise <string |null>=>{
    try {
        // ioredis already returns a promise so no need to make promice like
        //   return new Promise((resolve,reject)=>{
//     client.get(key,(err,data)=>{
//         if(err) {return reject(err);}
//          resolve(data);


        const data = await client.get(key); 
        return data; 
      } catch (err) {
        console.error('Error fetching data from Redis:', err);
        throw err;
      }
};

const setWeatherData = async (key: string, value: string, expiryInSeconds: number):Promise<void>=> {
   await client.set(key, value, 'EX', expiryInSeconds, (err) => {
      if (err) {
        console.error('Error setting data in Redis:', err);
      }
    });
  };


export {getWeatherData,setWeatherData}