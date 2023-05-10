import { PipelineStage, Types } from "mongoose";
import userRatingRepo from "./user-rating.repo";
import { IRating } from "./user-rating.type";
import { generatePipeline } from "../../utility/pipeline";
import shopService from "../shops/shop.service";

const create = async(rate : IRating)=>{
    userRatingRepo.create(rate);
    const result = [
        {
            $group : {
                _id: new Types.ObjectId(rate.shopId),
                avgRating: { $avg: "$rating" }
            }
        }
    ]
    const avgRating = await userRatingRepo.avgRating(result)
    return await shopService.findByIdAndUpdate({_id:rate.shopId},{$set : {rating: avgRating[0].avgRating}})
} 

//TO GET THE AVG RATING OF ALL SHOPS
const avgRating = async(query : object) => {
    const pipeline = generatePipeline(query);
    console.log(pipeline)
    const aggregate = await userRatingRepo.avgRating([
        {
                $group : {
                    _id : '$shopId',
                    avgRating: { $avg: "$rating" }
                },
               
            } , 
            ...pipeline
        ]
        )
    console.log(aggregate);
    return aggregate;
}

export default {
    create,
    avgRating
}