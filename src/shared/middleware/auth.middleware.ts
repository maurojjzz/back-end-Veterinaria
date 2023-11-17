import jwt from 'jsonwebtoken';
import e, { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
dotenv.config();


export const validateToken = (req:Request, res:Response, next:NextFunction) =>{
    const accessToken = req.headers['authorization']
    const token = accessToken && accessToken?.split(' ')[1]
    if(!token){
        return res.status(401).send("Access Denied")
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user)=>{
        if(err){
            return res.status(401).json({message: "access denied, token expired or incorrect"})
        }else{
          next()  
        }

    })
}