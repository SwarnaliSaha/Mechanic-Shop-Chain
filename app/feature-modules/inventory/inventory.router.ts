import { validateRole } from "../../utility/middlewares";
import { ResponseHandler } from "../../utility/response-handler";
import inventoryService from "./inventory.service";
import { Router,Request,Response,NextFunction } from "express";
import { ADD_ITEM_VALIDATOR, DELETE_ITEM_VALIDATOR, UPDATE_ITEM_VALIDATOR,VIEW_PRODUCT_VALIDATOR } from "./inventory.validation";
import { Types } from "mongoose";
import { Roles } from "../roles/role.type";

const router = Router();

//ADMIN CAN ADD A NEW ITEM TO THE INVENTORY LIST
router.post("/AddItem",validateRole([Roles.admin.toString()]),ADD_ITEM_VALIDATOR,(req:Request,res:Response,next:NextFunction)=>{
    try {
        const newItem = req.body;
        const result = inventoryService.addItem(newItem);

        res.send("New item added successfully to the inventory list");
    } 
    catch (error) {
        next(error);
    }
})

//ADMIN CAN UPDATE ANY PRODUCT FROM THE INVENTORY LIST
router.patch('/UpdateItem/:id',validateRole([Roles.admin.toString()]),UPDATE_ITEM_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    const updatedObject = req.body;
    const itemToUpdate = req.params.id;

    const result = await inventoryService.findByIdAndUpdate({_id:itemToUpdate},{$set : updatedObject});

    res.send("Item updated successfully");
})

//ADMIN CAN DELETE ANY PRODUCT FROM THE INVENTORY LIST
router.delete('/DeleteItem/:id',validateRole([Roles.admin.toString()]),DELETE_ITEM_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
    const itemToBeDeleted = req.params.id;

    const result = await inventoryService.findByIdAndUpdate({_id:itemToBeDeleted},{isDeleted:true});

    res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error)
    }
})

//ADMIN CAN VIEW THE FULL LIST OF PRODUCTS
router.get('/ViewAllProducts',validateRole([Roles.admin.toString()]),VIEW_PRODUCT_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const query = req.query;
        const result = await inventoryService.ViewAllProducts(query);
        res.send(new ResponseHandler(result))
    }
    catch(e){
        next(e);
    }
})

//ADMIN CAN VIEW A PARTICULAR PRODUCT FROM INVENTORY
// router.get('/ViewProduct/:productId',validateRole(["643eb96fc8f5f358c3db8d0f"]),VIEW_PRODUCT_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
//     try{
//         const result = await inventoryService.findOne({_id:new Types.ObjectId(req.params.productId)});
//         res.send(new ResponseHandler(result))
//     }
//     catch(e){
//         next(e);
//     }
// })


export default router;