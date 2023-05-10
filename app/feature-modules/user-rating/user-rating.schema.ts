import { IRating } from "./user-rating.type";
import { BaseSchema } from "../../utility/base-schema";
import { Schema, model } from "mongoose";

const RateSchema = new BaseSchema({
    shopId : {
        type:Schema.Types.ObjectId,
        ref:'Shops',
        required:true
    },
    rating : {
        type:Number,
        required:true
    }
})

type RatingDocument = Document & IRating;
export const RatingModel = model<RatingDocument>("Ratings",RateSchema);