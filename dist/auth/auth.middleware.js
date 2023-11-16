import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
dotenv.config();
export const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader?.split(' ')[1];
    if (token === undefined)
        return res.status(401).json({ message: "access denied" });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(403).json({ message: "access denied" });
        req.body.user = user;
        next();
    });
};
//# sourceMappingURL=auth.middleware.js.map