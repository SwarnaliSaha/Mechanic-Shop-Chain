import { IRewardRequirement } from "./reward.req.type";
import { BaseSchema } from "../../utility/base-schema";
import { Schema, model } from "mongoose";

const RewardRequirementSchema = new BaseSchema({
    shopId : {
        type : Schema.Types.ObjectId,
        ref : "Shops",
        required : true
    },
    reward : {
        type:Schema.Types.ObjectId,
        ref : "Inventory",
        required:true
    },
    isApproved : {
        type : Boolean,
        default : false
    }
})

type RewardRequirementDocument = Document & IRewardRequirement;
export const RewardRequirementModel = model<RewardRequirementDocument>("RewardRequirements",RewardRequirementSchema);