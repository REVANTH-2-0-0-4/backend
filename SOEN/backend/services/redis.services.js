import Redis from "ioredis";
export const redisclient = new Redis({
    host : process.env.REDIS_HOST,
    port : process.env.REDIS_PORT,
    password : process.env.REDIS_PASSWORD
});
redisclient.on("connect",()=>{
    console.log("redisconnected");
})
