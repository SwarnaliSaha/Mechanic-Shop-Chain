import { FilterQuery, UpdateQuery } from "mongoose";
import { UserModel } from "./user.schema";
import { IUser } from "./user.type";

const create = async(user:IUser)=>{
    console.log(user);
    const result = await UserModel.create(user);
    console.log(result);
    return result;
} 

const find = (pipeline:any) => UserModel.aggregate(pipeline);

const findOne = async (filters:Partial<IUser>) => {
    try {
        return await UserModel.findOne({
            ...filters,
            isDeleted:false
        })
    } catch (err) {
        throw { message: 'sorry', e: err } 
    } 
}

const findByIdAndUpdate = (filter:FilterQuery<IUser>,update:UpdateQuery<IUser>) =>{
    return UserModel.findByIdAndUpdate(filter,update)
}

export default {
    create,
    find,
    findOne,
    findByIdAndUpdate
}