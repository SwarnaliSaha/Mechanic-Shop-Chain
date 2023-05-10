import { FilterQuery, UpdateQuery } from "mongoose";
import { SaleModel } from "./sales.schema";
import { ISale } from "./sales.type";

const create = (bill : ISale)=>SaleModel.create(bill);

const find = (pipeline:any) => SaleModel.aggregate(pipeline);

const findOne = async (filters:Partial<ISale>) => {
    try {
        return await SaleModel.findOne({
            ...filters,
            isDeleted:false
        })
    } catch (err) {
        throw { message: 'sorry', e: err } 
    } 
}

const updateOne = async (filter:FilterQuery<ISale>,update:UpdateQuery<ISale>) => {
    return SaleModel.updateOne(filter,update);
}

const dateWiseBill = async(pipeline:any) => await SaleModel.aggregate(pipeline);


export default {
    create,
    find,
    findOne,
    updateOne,
    dateWiseBill
}