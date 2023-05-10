import { Types } from "mongoose";
import { validateRole } from "../../utility/middlewares";
import { ResponseHandler } from "../../utility/response-handler";
import { Roles } from "../roles/role.type";
import { DELETE_BILL_VALIDATOR, GENERATE_BILL_VALIDATOR, ITEM_WISE_SELLER_VALIDATOR, VIEW_BILL_VALIDATOR } from "./sales-validation";
import salesService from "./sales.service";
import { Router,Request,Response,NextFunction } from "express";

const router = Router();

//SHOP-OWNER GENERATES THE BILL
router.post('/GenerateBill',validateRole([Roles.shopKeeper.toString()]),GENERATE_BILL_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const bill = req.body;
        const result = await salesService.generateBill(bill);

    res.send(new ResponseHandler(result));
    } catch (error) {
        console.log(error);
        next(error);
    }
})

//SHOP OWNER CAN DELETE ANY BILL
router.delete('/DeleteBill/:reqId',validateRole([Roles.shopKeeper.toString()]),DELETE_BILL_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const reqId = req.params.reqId;
        const result = await salesService.deleteSale(new Types.ObjectId(reqId));

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error);
    }
})

//ADMIN CAN VIEW ALL THE BILLS
router.get('/GetBills',validateRole([Roles.admin.toString()]),VIEW_BILL_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const query = req.query;
        console.log(query)
        const result = await salesService.viewBills(query);

    res.send(new ResponseHandler(result));
    } catch (error) {
        console.log(error);
        next(error);
    }
})

//ADMIN CAN VIEW THE ITEM WISE HIGHEST SELLER
router.get('/ItemWiseSeller',validateRole([Roles.admin.toString()]),ITEM_WISE_SELLER_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const query = req.query;
        const result = await salesService.itemWiseHighestSeller(query);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error);
    }
})

export default router;