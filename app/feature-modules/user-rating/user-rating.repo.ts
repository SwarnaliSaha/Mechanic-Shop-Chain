import { ObjectId } from "bson";
import { RatingModel } from "./user-rating.schema";
import { IRating } from "./user-rating.type";
import shopService from "../shops/shop.service";
import { PipelineStage, Types } from "mongoose";

const create = (rate : IRating)=> RatingModel.create(rate);

const find = (filter={})=>RatingModel.find({...filter, isDeleted: false});

const avgRating = async(pipeline:any) => await RatingModel.aggregate(pipeline);

const avgOfAShop = async(shopId:string) => {
    const result = await RatingModel.aggregate([
        {
            $group : {
                _id: new Types.ObjectId(shopId),
                avgRating: { $avg: "$rating" }
            }
        }
    ])
    return await shopService.findByIdAndUpdate({_id:shopId},{$set : {rating: result[0].avgRating}})
}

export default {
    create,
    avgRating,
    avgOfAShop,
    find
}