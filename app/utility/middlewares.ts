import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import fs from "fs"
import path from "path"

export const authorize = (excludedPaths: ExcludedPaths) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if(excludedPaths.find(e => e.path === req.url && e.methods === req.method)) {
                return next();
            }
            const token = req.headers.authorization?.split(' ')[1]

            const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname,"..\\keys\\public.pem"), {encoding : "utf-8"})
        
            const  tokenDecode = verify(token || "", PUBLIC_KEY || "");
            console.log(tokenDecode)
        
            res.locals.tokenDecode = tokenDecode 
        
            next();
        
        }catch(e){
            next(e);
        }     

    }
}

export const validateRole = (roles : string[]) => 
{
    return (req:Request,res:Response,next:NextFunction)=>{
        try{
            const {role} = res.locals.tokenDecode;
           
            for(let ele of roles){
                if(ele===role.toString()) return next()
            }

            return next({ message: "Unauthorised Access", statusCode: 401 });
            
        } catch (e) {
            next(e);
        }
    }
}

type methods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export class ExcludedPath{
    constructor(
        public path : string,
        public methods :methods
    ){}
}
export type ExcludedPaths = ExcludedPath[];