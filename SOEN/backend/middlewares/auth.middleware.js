import jwt from "jsonwebtoken"
export const auth = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401).send({ error: 'unauthorised user'  });

        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        console.log(err);
        
        res.status(401).send({ error: 'please authenticate' });
    }
}