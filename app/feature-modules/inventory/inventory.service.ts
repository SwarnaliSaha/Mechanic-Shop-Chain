import { response } from "express";
import inventoryRepo from "./inventory.repo";
import { IInventory } from "./inventory.types";
import { PartsFound } from "./response";
import { FilterQuery, Types, UpdateQuery } from "mongoose";
import { generatePipeline } from "../../utility/pipeline";

const create = (item:IInventory)=>inventoryRepo.create(item);

const findOne = async (filters:Partial<IInventory>) => {
    filters._id=new Types.ObjectId(filters._id)
    const part = await inventoryRepo.findOne(filters);
    console.log(part)
    if(!part) throw PartsFound.PART_NOT_FOUND;
    
    return part;
}

const findByIdAndUpdate = (filter: FilterQuery<IInventory>, update: UpdateQuery<IInventory>) => {
    return inventoryRepo.findByIdAndUpdate(filter, update)
}

const addItem = (item:IInventory) => {
    let record = create(item);

    return record;
}

//ADMIN CAN VIEW THE LIST OF ALL PRODUCTS
const ViewAllProducts = async(query:any)=>{
    const pipeline = generatePipeline(query);
    const result = await inventoryRepo.find(pipeline);

    return result;
}

export default {
    create,
    addItem,
    findByIdAndUpdate,
    findOne,
    ViewAllProducts
}

