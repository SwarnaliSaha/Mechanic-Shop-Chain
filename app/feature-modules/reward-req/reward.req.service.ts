import { FilterQuery,UpdateQuery } from "mongoose";
import { ObjectId } from "bson";
import rewardReqRepo from "./reward.req.repo";
import { IRewardRequirement } from "./reward.req.type";
import shopService from "../shops/shop.service";
import { SHOP_RESPONSES } from "../shops/shop-response";
import inventoryService from "../inventory/inventory.service";
import rewardService from "../rewards/reward.service";
import { generatePipeline } from "../../utility/pipeline";
import { REWARD_REQ_RESPONSES } from "./reward-req.response";

const create = (reward: IRewardRequirement) => rewardReqRepo.create(reward);

const find = (pipeline:any) => rewardReqRepo.find(pipeline);

const findOne = async (filters: Partial<IRewardRequirement>) => {
    const rewardRequirement = await rewardReqRepo.findOne(filters);
    if (!rewardRequirement) throw "Not Found"

    return rewardRequirement;
}

const updateOne = (filter: FilterQuery<IRewardRequirement>, update: UpdateQuery<IRewardRequirement>) => {
    return rewardReqRepo.updateOne(filter, update)
}

//SHOP OWNER POSTS A NEW REQUEST FOR A REWARD
const newRewardRequest = async (reward: IRewardRequirement) => {
    const record = await create(reward);

    return record;
}

//ADMIN CAN VIEW ALL REWARD REDEMPTION REQUESTS
const ViewAllRewardsRequests = async(query:any)=>{
    const pipeline = generatePipeline(query);

    const result = await rewardReqRepo.find(pipeline);

    return result;
}

//ADMIN CAN APPROVE THE REWARD REQUEST
const approveRewardRequest = async(reqId: ObjectId)=>{

    const requirementDocument = await findOne({ _id: reqId, isApproved : false});
    const shop1 = await shopService.findOne({_id:requirementDocument.shopId});
    if (!shop1) throw SHOP_RESPONSES.SHOP_NOT_FOUND;

    const rewardObject = await rewardService.findOne({_id:requirementDocument.reward})
    const rewardPoint = rewardObject.rewardPoints;

    if(shop1.transactionApprovalStatus == true && rewardPoint<=shop1.points){
        await updateOne({ _id: reqId},{$set : {isApproved : true}})

        await shopService.findByIdAndUpdate({_id:requirementDocument.shopId},{$inc : {points : -rewardPoint}});

        const result = await shopService.updateOne(
            { _id: requirementDocument.shopId},
            {
                $push : {
                    redeemedGifts : requirementDocument.reward
                }
            }
        )
        return result;
    }
    else{
        throw REWARD_REQ_RESPONSES.NON_APPROVAL;
    }

}
export default {
    create,
    newRewardRequest,
    findOne,
    updateOne,
    ViewAllRewardsRequests,
    approveRewardRequest,
    find
}