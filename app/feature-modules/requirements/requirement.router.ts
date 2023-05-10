import { Types } from "mongoose";
import { ResponseHandler } from "../../utility/response-handler";
import requirementService from "./requirement.service";
import { Router,Request,Response,NextFunction } from "express";
import { validateRole } from "../../utility/middlewares";
import { ADD_REQUEST_VALIDATOR, APPROVE_REQ_VALIDATOR, VIEW_ALL_REQUESTS } from "./requirement.validator";
import { Roles } from "../roles/role.type";

const router = Router();

//SHOP-OWNER CAN MAKE A NEW REQUEST FOR PRODUCT
router.post('/AddRequest',validateRole([Roles.shopKeeper.toString()]),ADD_REQUEST_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const requestedProducts = req.body;
        const result = await requirementService.newRequest(requestedProducts);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error);
    }
})

//ADMIN CAN VIEW THE LIST OF ALL REQUIREMENT REQUESTS
router.get('/ViewAllRequests',validateRole([Roles.admin.toString()]),VIEW_ALL_REQUESTS,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const query = req.query;
        const result = await requirementService.ViewAllRequests(query);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error);
    }
})

//ADMIN CAN APPROVE THE REQUEST FOR PRODUCT MADE BY THE SHOP-OWNER
router.post('/ApproveRequest/:reqId',validateRole([Roles.admin.toString()]),async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let reqId=req.params.reqId;
        const result = await requirementService.requestApproval(new Types.ObjectId(reqId));

    res.send(new ResponseHandler(result));
    } catch (error) {
        next(error)
    }
})

export default router;