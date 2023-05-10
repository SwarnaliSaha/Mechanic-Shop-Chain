import { FilterQuery, PipelineStage, UpdateQuery } from "mongoose";
import { RewardsModel } from "./reward.schema";
import { IRewards } from "./reward.type";

const create = (reward:IRewards)=>RewardsModel.create(reward);

const findByIdAndUpdate = (filter:FilterQuery<IRewards>,update:UpdateQuery<IRewards>) =>{
    return RewardsModel.findByIdAndUpdate(filter,update)
}

const find = (pipeline:any) => RewardsModel.aggregate(pipeline);

const findOne = async (filters:Partial<IRewards>) => {
    try {
        return await RewardsModel.findOne({
            ...filters,
            isDeleted:false
        })
    } catch (err) {
        throw { message: 'sorry', e: err } 
    } 
}

export default {
    create,
    findByIdAndUpdate,
    find,
    findOne
}