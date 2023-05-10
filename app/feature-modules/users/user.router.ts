import { Router,Request,Response,NextFunction, response } from "express";
import userService from "./user.service";
import { Types } from "mongoose";
import { ResponseHandler } from "../../utility/response-handler";
import { validateRole } from "../../utility/middlewares";
import { Roles } from "../roles/role.type";
import { OWNER_ID_VALIDATOR, UPDATE_OWNER_VALIDATION, VIEW_ALL_OWNER } from "./user.validation";

const router = Router();

//ADMIN CAN VIEW THE LIST OF ALL SHOP-OWNER
router.get('/viewallusers',validateRole([Roles.admin.toString()]),VIEW_ALL_OWNER,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const query = req.query;
        const result = await userService.viewUsers(query);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error)
    }
})

//ADMIN CAN UPDATE THE DETAILS OF ANY SHOP-OWNER
router.patch('/UpdateOwner/:userId',validateRole([Roles.admin.toString()]),UPDATE_OWNER_VALIDATION,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const userId = req.params.userId;
        const result = await userService.updateUser(new Types.ObjectId(userId),req.body);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error)
    }
})

//ADMIN CAN DELETE ANY SHOP-OWNER
router.delete('/DeleteOwner/:userId',validateRole([Roles.admin.toString()]),OWNER_ID_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const userId = req.params.userId;
        const result = await userService.deleteUser(new Types.ObjectId(userId));

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error);
    }
})

export default router;