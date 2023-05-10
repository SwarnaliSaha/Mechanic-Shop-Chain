import { Types } from "mongoose";
import { ResponseHandler } from "../../utility/response-handler";
import userService from "../users/user.service";
import shopService from "./shop.service";
import { Router,Request,Response,NextFunction, response } from "express";
import { validateRole } from "../../utility/middlewares";
import { CREATE_SHOP_VALIDATION, TRANSACTION_APPROVAL_VALIDATOR, VIEW_ALL_SHOPS, SHOP_ID_VALIDATOR,UPDATE_SHOP_VALIDATOR,VALIDATOR_FOR_OWNER} from "./shop.validation";
import { Roles } from "../roles/role.type";

const router = Router();

//ROUTER TO REGISTER A NEW SHOP
router.post('/RegisterShop',validateRole([Roles.admin.toString()]),CREATE_SHOP_VALIDATION,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const shop = req.body;
        //const {userName,email} = shop.ownerDetails;
        const result = await shopService.registerShop(shop);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error)
    }
})

//ADMIN CAN SEE THE LIST OF ALL SHOPS 
router.get('/ViewAllShop',validateRole([Roles.admin.toString()]),VIEW_ALL_SHOPS,async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const query = req.query;
        const result = await shopService.ViewAllShop(query);
        res.send(new ResponseHandler(result))
    }
    catch(e){
        next(e);
    }
})

//DELETE A SHOP BY ADMIN
router.delete('/deleteShop/:id',validateRole([Roles.admin.toString()]),SHOP_ID_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const shopId = req.params.id;
        const result = await shopService.deleteShop(new Types.ObjectId(shopId));

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error)
    }
})

//ADMIN CAN UPDATE A SHOP
router.patch('/updateShop/:id',validateRole([Roles.admin.toString()]),UPDATE_SHOP_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const shopId = req.params.id;
        const updates = req.body;
        const result = await shopService.updateShop(new Types.ObjectId(shopId),updates)

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error);
    }
})

//ADMIN CAN APPROVE THE TRANSACTION
router.patch('/ApproveTransaction/:shopId',validateRole([Roles.admin.toString()]),TRANSACTION_APPROVAL_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const shopId = req.params.shopId;
        const {status} = req.body;

        const result = await shopService.transactionApproval(new Types.ObjectId(shopId),status);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error)
    }
})

//SHOP OWNER ROUTES

//1. SHOP OWNER CAN VIEW THE RATING OF HIS OWN SHOP
router.get('/details/:shopId',validateRole([Roles.shopKeeper.toString()]),VALIDATOR_FOR_OWNER,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const query = req.query;
        const shopId = req.params.shopId;

        const result = await shopService.viewRating(new Types.ObjectId(shopId),query);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error)
    }
})

//2. SHOP OWNER CAN VIEW THE LIST OF PRODUCTS WHICH HE HAS REQUESTED FOR
router.get('/MyRequirements/:shopId',validateRole([Roles.shopKeeper.toString()]),VALIDATOR_FOR_OWNER,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const query = req.query;
        const shopId = req.params.shopId;

        const result = await shopService.fetchRequirementDetails(new Types.ObjectId(shopId),query);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error)
    }
})

//3. SHOP OWNER CAN VIEW THE LIST OF REWARDS WHICH HE HAS REQUESTED FOR
router.get('/MyRewardsRequests/:shopId',validateRole([Roles.shopKeeper.toString()]),VALIDATOR_FOR_OWNER,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const query = req.query;
        const shopId = req.params.shopId;

        const result = await shopService.fetchRewardsDetails(new Types.ObjectId(shopId),query);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error)
    }
})

export default router;