import { IRequirement } from "./requirement.type";
import { BaseSchema } from "../../utility/base-schema";
import { Schema, model } from "mongoose";

const RequirementSchema = new BaseSchema({
    shopId : {
        type : Schema.Types.ObjectId,
        ref : "Shops",
        required : true
    },
    partsRequired : [
        {
            itemId : {
                type:Schema.Types.ObjectId,
                ref : "Inventory",
                required : true
            },
            requiredQty : {
                type : Number,
                required : true
            }
        }
    ],
    isApproved : {
        type : Boolean,
        default : false
    }
})

type RequirementDocument = Document & IRequirement;
export const RequirementModel = model<RequirementDocument>("Requirements",RequirementSchema);