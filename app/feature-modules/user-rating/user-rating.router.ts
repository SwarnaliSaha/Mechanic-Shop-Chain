import { NextFunction, Router, Request,Response } from "express";
import userRatingService from "./user-rating.service";
import { ResponseHandler } from "../../utility/response-handler";
import { validateRole } from "../../utility/middlewares";
import { GET_ALL_AVG_RATING, USER_RATING_VALIDATION} from "./user-rating.validation";
import { Roles } from "../roles/role.type";

const router = Router();

//USER CAN GIVE RATING TO ANY SHOP
router.post('/',USER_RATING_VALIDATION,async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const result = await userRatingService.create(req.body);
        res.send(new ResponseHandler("thank you for rating our shop"))
    }
    catch(error){
        next(error)
    }
})

//TO FETCH THE AVG RATING OF ALL SHOPS TO THE ADMIN
router.get('/getAvgRating',validateRole([Roles.admin.toString()]),GET_ALL_AVG_RATING,async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const query = req.query;
        console.log(query);
        const result = await userRatingService.avgRating(query);

        res.send(new ResponseHandler(result));
    }
    catch(e){
        next(e)
    }
})

export default router;