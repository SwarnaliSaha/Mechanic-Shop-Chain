import { IRewards } from "./reward.type";
import { BaseSchema } from "../../utility/base-schema";
import { model } from "mongoose";

const RewardsSchema = new BaseSchema({
    rewardName : {
        type:String,
        required:true
    },
    rewardPoints : {
        type:Number,
        reqiered:true
    }
})

type RewardsDocument = Document & IRewards;
export const RewardsModel = model<RewardsDocument>("Rewards",RewardsSchema);