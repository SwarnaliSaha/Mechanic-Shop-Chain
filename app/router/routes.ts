import { authorize } from "../utility/middlewares";
import { ResponseHandler } from "../utility/response-handler";
import { excludedPaths, routes } from "./route.data";
import { Application,json,Request,Response,NextFunction } from "express";

export const registerRoutes = (app:Application)=>{
    app.use(json());
    app.use(authorize(excludedPaths));
    
    for(let route of routes){
        app.use(route.path,route.router)
    }
    app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
        res.status(err.statusCode||500).send(new ResponseHandler(null,err))
    })
}