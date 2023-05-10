import { IRewards } from "./reward.type";
import rewardService from "./reward.service";
import { Router,Request,Response,NextFunction } from "express";
import { ResponseHandler } from "../../utility/response-handler";
import { validateRole } from "../../utility/middlewares";
import { ADD_REWARD_VALIDATOR, DELETE_REWARD_VALIDATAOR, SHOPID_VALIDATOR, UPDATE_REWARD_VALIDATOR, VALIDATE_PAGE_NUMBER, VIEW_REWARD_VALIDATOR } from "./reward-validator";
import { Types } from "mongoose";
import { Roles } from "../roles/role.type";

const router = Router();

//ADMIN CAN ADD A NEW REWARD TO THE REWARDS LIST
router.post("/AddRewards",validateRole([Roles.admin.toString()]),ADD_REWARD_VALIDATOR,(req:Request,res:Response,next:NextFunction)=>{
    try {
        const newReward = req.body;
        const result = rewardService.addNewReward(newReward);

        res.send("Reward is added successfully to the database");
    } 
    catch (error) {
        next(error);
    }
})

//ADMIN CAN VIEW THE LIST OF ALL REWARDS
router.get('/ViewAllRewards',validateRole([Roles.admin.toString()]),VIEW_REWARD_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const query = req.query;
        const result = await rewardService.ViewAllRewards(query);
        res.send(new ResponseHandler(result))
    }
    catch(e){
        next(e);
    }
})

//ADMIN CAN UPDATE ANY REWARD FROM REWARD LIST
router.patch('/UpdateReward/:id',validateRole([Roles.admin.toString()]),UPDATE_REWARD_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    const updatedObject = req.body;
    const rewardToUpdate = req.params.id;

    const result = await rewardService.findByIdAndUpdate({_id:rewardToUpdate},{$set : updatedObject});

    res.send(new ResponseHandler(result));
})

//ADMIN CAN DELETE ANY REWARD ITEM FROM THE REWARDS LIST
router.delete('/DeleteReward/:id',validateRole([Roles.admin.toString()]),DELETE_REWARD_VALIDATAOR,async(req:Request,res:Response,next:NextFunction)=>{
    const rewardToBeDeleted = req.params.id;

    const result = await rewardService.findByIdAndUpdate({_id:rewardToBeDeleted},{isDeleted:true});

    res.send(new ResponseHandler(result));
})

router.get('/AvailableRewards/:shopId',validateRole([Roles.shopKeeper.toString()]),SHOPID_VALIDATOR ,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let shopId = req.params.shopId;
        let query = req.query;

        const result = await rewardService.availableRewards(new Types.ObjectId(shopId),query);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        console.log(error)
        next(error)
    }
})

export default router;