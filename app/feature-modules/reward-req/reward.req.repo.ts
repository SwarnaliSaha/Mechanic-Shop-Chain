import { FilterQuery, UpdateQuery } from "mongoose";
import { RewardRequirementModel } from "./reward.req.schema";
import { IRewardRequirement } from "./reward.req.type";

const create = (reward:IRewardRequirement)=>RewardRequirementModel.create(reward);

const find = (pipeline:any) => RewardRequirementModel.aggregate(pipeline);

const updateOne = async (filter:FilterQuery<IRewardRequirement>,update:UpdateQuery<IRewardRequirement>) => {
    return RewardRequirementModel.updateOne(filter,update);
}

const findOne = async (filters:Partial<IRewardRequirement>) => {
    try {
        return await RewardRequirementModel.findOne({
            ...filters,
            isDeleted:false
        })
    } catch (err) {
        throw { message: 'sorry', e: err } 
    } 
}

export default {
    create,
    find,
    findOne,
    updateOne
}