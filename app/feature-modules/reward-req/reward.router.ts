import { Types } from "mongoose";
import { ResponseHandler } from "../../utility/response-handler";
import rewardReqService from "./reward.req.service";
import { Router,Request,Response,NextFunction } from "express";
import { validateRole } from "../../utility/middlewares";
import { APPROVE_REWARD_VALIDATOR, REWARD_REQUEST_VALIDATOR, SHOPID_VALIDATOR, VIEW_ALL_REDEEM_REQUESTS_VALIDATOR } from "./reward-req.validator";
import roleRepo from "../roles/role.repo";
import { Roles } from "../roles/role.type";

const router = Router();

//SHOP-OWNER MAKES NEW REQUEST FOR REWARD
router.post('/RewardRequest',validateRole([Roles.shopKeeper.toString()]),REWARD_REQUEST_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await rewardReqService.newRewardRequest(req.body);

        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error)
    }
})

//ADMIN CAN VIEW THE LIST OF ALL REWARD REQUESTS
router.get('/ViewAllRedeemRequests',validateRole([Roles.admin.toString()]),VIEW_ALL_REDEEM_REQUESTS_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const query = req.query;
        const result = await rewardReqService.ViewAllRewardsRequests(query);

        res.send(new ResponseHandler(result));
    } 
    catch (error) {
        next(error);
    }
})

//ADMIN CAN APPROVE OR REJECT ANY REWARD REQUEST
router.patch("/ApproveRewad/:reqId",validateRole([Roles.admin.toString()]),APPROVE_REWARD_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let reqId = req.params.reqId;
        const result = await rewardReqService.approveRewardRequest(new Types.ObjectId(reqId))

        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error)
    }
})


export default router;