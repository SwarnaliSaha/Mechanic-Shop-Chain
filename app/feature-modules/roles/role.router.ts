import { NextFunction, Router, Request,Response } from "express";
import roleService from "./role.service";
import { ResponseHandler } from "../../utility/response-handler";
import { DELETE_ROLE_VALIDATION, REGISTER_ROLE_VALIDATION } from "./roles.validation";
import { validateRole } from "../../utility/middlewares";
import { Roles } from "./role.type";
import { Types } from "mongoose";

const router = Router();

router.post('/RegisterRole',validateRole([Roles.admin.toString()]),REGISTER_ROLE_VALIDATION,async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const result = await roleService.create(req.body);
        const data = await result.save();
        res.send(new ResponseHandler(result))
    }
    catch(error){
        next(error)
    }
})

router.delete('/DeleteRole/:roleId',validateRole([Roles.admin.toString()]),DELETE_ROLE_VALIDATION,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const roleId = req.params.roleId;
        const result = await roleService.deleteRole(new Types.ObjectId(roleId));

        res.send(new ResponseHandler(result))
    } 
    catch (error) {
        next(error)
    }
})

export default router;
