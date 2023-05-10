import { FilterQuery, UpdateQuery } from "mongoose";
import { RequirementModel } from "./requirement.schema";
import { IRequirement } from "./requirement.type";

const create = (item:IRequirement)=>RequirementModel.create(item);

const find = (pipeline:any) => RequirementModel.aggregate(pipeline);

const findOne = async (filters:Partial<IRequirement>) => {
    try {
        return await RequirementModel.findOne({
            ...filters,
            isDeleted:false
        })
    } catch (err) {
        throw { message: 'sorry', e: err } 
    } 
}

const findByIdAndUpdate = (filter:FilterQuery<IRequirement>,update:UpdateQuery<IRequirement>) =>{
    return RequirementModel.findByIdAndUpdate(filter,update)
}

const updateOne = async (filter:FilterQuery<IRequirement>,update:UpdateQuery<IRequirement>) => {
    return RequirementModel.updateOne(filter,update,{returnOriginal:false});
}

export default {
    create,
    find,
    findOne,
    findByIdAndUpdate,
    updateOne
}