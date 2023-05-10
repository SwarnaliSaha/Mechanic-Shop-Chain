import { ObjectId } from "bson";
import shopRepo from "./shop.repo";
import { IShop } from "./shop.type";
import { genSalt, hash } from "bcryptjs";
import { FilterQuery, Types, UpdateQuery } from "mongoose";
import { Roles } from "../roles/role.type";
import userService from "../users/user.service";
import authService from "../auth/auth.service";
import { SHOP_RESPONSES } from "./shop-response";
import { generatePipeline } from "../../utility/pipeline";
import requirementService from "../requirements/requirement.service";
import rewardReqService from "../reward-req/reward.req.service";

const create = (shop:IShop)=>shopRepo.create(shop);

const findOne = async (filters:Partial<IShop>) => {
    const shop = await shopRepo.findOne(filters);
    if(!shop) throw SHOP_RESPONSES.SHOP_NOT_FOUND
    
    return shop;
}

const updateOne = (filter: FilterQuery<IShop>, update: UpdateQuery<IShop>) => {
    return shopRepo.updateOne(filter, update)
}

const findItem = async (shopId:ObjectId,curItemId:ObjectId) => {
    const record = await shopRepo.findItem(shopId,curItemId);
    console.log(record)
    if(!record) throw "Sorry";

    return record;
}

const findByIdAndUpdate = (filter: FilterQuery<IShop>, update: UpdateQuery<IShop>) => {
    return shopRepo.findByIdAndUpdate(filter, update)
}

//ADMIN REGISTERS A NEW SHOP
const registerShop = async(shop:IShop) => {
    shop.ownerDetails.role = Roles.shopKeeper;
    let record = await create(shop);

    const UserData={
        role:shop.ownerDetails.role,
        password:shop.ownerDetails.password,
        shopId:record._id,
        userName:shop.ownerDetails.userName,
        email : shop.ownerDetails.email
    }
    const userResult = await userService.registerUser(UserData)
    return record;
}

//ADMIN CAN VIEW THE LIST OF ALL SHOPS,SORT THEM ACCORDINGLY,FILTER THEM ACCORDINGLY WITH PAGINATION
const ViewAllShop = async(query:any)=>{
    const {shopId,...filter} = query;

    const pipeline = generatePipeline(filter);

    const aggregate = [];

    if(shopId){
        aggregate.push({
            $match : {
                _id : new Types.ObjectId(shopId)
            }
        })
    }

    aggregate.push(...pipeline);

    const result = await shopRepo.find(aggregate);

    return result;
}

//ADMIN CAN UPDATE THE DETAILS OF ANY SHOP
const updateShop = async(shopId:ObjectId,updates:Object) => {
    return await updateOne(
        {_id:shopId},
        {$set : 
            updates
        }
    )
}

//ADMIN CAN DELETE ANY SHOP
const deleteShop = async(shopId:ObjectId) => {
    return await updateOne(
        {_id:shopId},
        {$set : {
            isDeleted : true
        }}
    )
}

//ADMIN CAN APPROVE OR REJECT THE TRANSACTION STATUS OF A SHOP
const transactionApproval = async(shopId:any,status:boolean) => {
    if(status==true){
        const shop = await findOne({_id:shopId});
        const result = await updateOne(
            {_id:shopId},
            {$set : {
                transactionApprovalStatus : status,
                points : shop.pendingPoints,
                pendingPoints : 0
            }}
        )
        
        return result;
    }
    else{
        const result = await updateOne(
            {_id:shopId},
            {$set : {
                transactionApprovalStatus : status,
                points : 0,
                revenue : 0
            }}
        )
        return result;
    }
}

//1. SHOP-OWNER CAN VIEW THE DETAILS OF ITS OWN SHOP
const viewRating = async(shopId:ObjectId,query:any)=>{
    const pipeline = generatePipeline(query);
    const aggregate = [
        {
            $match : {
                _id : shopId
            }
        },
        {
            $project : {
                _id : 1,
                shopName:1,
                rating: 1,
                inventory:1,
                points:1,
                redeemedGifts:1
            }
        },
        ...pipeline
    ]

    return await shopRepo.find(aggregate);
}

//2. SHOP OWNER CAN VIEW THE LIST OF PRODUCTS HE HAS ASKED FOR
const fetchRequirementDetails = async(shopId:ObjectId,query:any)=>{
    const pipeline = generatePipeline(query);

    const aggregate = [
        {
            $match : {
                shopId : shopId
            }
        },
        ...pipeline
    ]

    return await requirementService.find(aggregate);
}

//3. SHOP OWNER CAN VIEW THE LIST OF REWARDS HE HAS ASKED FOR
const fetchRewardsDetails = async(shopId:ObjectId,query:any)=>{
    const pipeline = generatePipeline(query);

    const aggregate = [
        {
            $match : {
                shopId : shopId
            }
        },
        ...pipeline
    ]

    return await rewardReqService.find(aggregate);
}

export default {
    create,
    findOne,
    updateOne,
    findItem,
    findByIdAndUpdate,
    registerShop,
    ViewAllShop,
    updateShop,
    deleteShop,
    transactionApproval,
    viewRating,
    fetchRequirementDetails,
    fetchRewardsDetails
}