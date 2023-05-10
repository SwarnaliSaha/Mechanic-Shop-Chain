import { FilterQuery, UpdateQuery } from "mongoose";
import { InventoryModel } from "./inventory.schema";
import { IInventory } from "./inventory.types";

const create = (item:IInventory)=>InventoryModel.create(item);

const findOne = async (filters:Partial<IInventory>) => {
    try {
        return await InventoryModel.findOne({
            ...filters,
            isDeleted:false
        })
    } catch (err) {
        throw { message: 'sorry', e: err } 
    } 
}

const find = (pipeline:any) => InventoryModel.aggregate(pipeline);

const findByIdAndUpdate = (filter:FilterQuery<IInventory>,update:UpdateQuery<IInventory>) =>{
    return InventoryModel.findByIdAndUpdate(filter,update)
}

export default {
    create,
    findOne,
    find,
    findByIdAndUpdate
}
