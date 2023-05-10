import { ObjectId } from "bson";
import { ShopModel } from "./shop.schema";
import { IShop } from "./shop.type";
import { FilterQuery, Types, UpdateQuery } from "mongoose";

const create = (shop:IShop)=>ShopModel.create(shop);

const findOne = async (filters:Partial<IShop>) => {
    try {
        return await ShopModel.findOne({
            ...filters,
            isDeleted:false
        })
    } catch (err) {
        throw { message: 'sorry', e: err } 
    } 
}

const find = (pipeline:any) => ShopModel.aggregate(pipeline);

const updateOne = async (filter:FilterQuery<IShop>,update:UpdateQuery<IShop>) => {
    return ShopModel.updateOne(filter,update);
}

const findItem = async (shopId:ObjectId,curItemId:ObjectId) => {
    try {
        const record = await ShopModel.findOne(
            {
                "_id" : new Types.ObjectId(shopId),
                "inventory.itemId": curItemId
            },
            {
            inventory : {
                $elemMatch : {
                    itemId : curItemId
                }
            }
        }
        )
        return record;
    } 

    catch (error) {
        console.log(error);
    }
}

const findByIdAndUpdate = (filter:FilterQuery<IShop>,update:UpdateQuery<IShop>) =>{
    return ShopModel.findByIdAndUpdate(filter,update)
}


export default {
    create,
    findOne,
    updateOne,
    findItem,
    findByIdAndUpdate,
    find
}