import jwt from "jsonwebtoken"
import { redisclient } from "../services/redis.services.js"
export const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        if (!token) {
           return res.status(401).json({ error: 'unauthorised user'  });
        }
        const isBlacklisted = await redisclient.get(token);
        console.log(isBlacklisted);
        
        if(isBlacklisted){
            try{
                res.cookie("token","");
                return res.status(401).json({
                    message : "unauthorisedd user"
                });
            }
            catch(err){
               return  res.status(401).send("unauthorised  user");
            }
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ error: 'please authenticate' });
    }
}