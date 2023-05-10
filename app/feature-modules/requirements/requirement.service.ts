import { ObjectId } from "bson";
import requirementRepo from "./requirement.repo";
import { IRequirement } from "./requirement.type";
import { FilterQuery, UpdateQuery } from "mongoose";
import shopService from "../shops/shop.service";
import { ShopModel } from "../shops/shop.schema";
import { RequirementModel } from "./requirement.schema";
import { SHOP_RESPONSES } from "../shops/shop-response";
import { generatePipeline } from "../../utility/pipeline";
import { REQUIREMENT_RESPONSES } from "./requirement.responses";

const create = (item: IRequirement) => requirementRepo.create(item);

const findOne = async (filters:FilterQuery<IRequirement>) => {
    console.log(filters)
    const requirement = await requirementRepo.findOne(filters);

    return requirement;
}

const find = (pipeline:any) => requirementRepo.find(pipeline);

const findByIdAndUpdate = (filter: FilterQuery<IRequirement>, update: UpdateQuery<IRequirement>) => {
    return requirementRepo.findByIdAndUpdate(filter, update)
}

const updateOne = (filter: FilterQuery<IRequirement>, update: UpdateQuery<IRequirement>) => {
    return requirementRepo.updateOne(filter, update)
}

//REQUEST FOR PRODUCTS BY THE SHOP-OWNER
const newRequest = async (item: IRequirement) => {
    const record = await create(item);

    return record;
}

//ADMIN CAN VIEW THE LIST OF ALL REQUIREMENT REQUESTS
const ViewAllRequests = async(query:any)=>{
    const pipeline = generatePipeline(query);

    const result = await requirementRepo.find(pipeline);

    return result;
}


//REQUEST APPROVAL BY THE ADMIN FOR THE PRODUCTS
const requestApproval = async (reqId: any) => {

    const requirementDocument = await findOne({ _id: reqId, isApproved : false});
    if(!requirementDocument) throw REQUIREMENT_RESPONSES.REQUIREMENT_NOT_FOUND;

    const shop1 = await shopService.findOne({_id:requirementDocument.shopId});
    if (!shop1) SHOP_RESPONSES.SHOP_NOT_FOUND;

    await updateOne({ _id: reqId, isApproved : false},{$set : {isApproved : true,isDeleted:true}});

    for (let item of requirementDocument.partsRequired) { 
    
    const result = await shopService.updateOne({ _id: requirementDocument.shopId, "inventory.itemId": item.itemId },
         {
                 $inc:{
                    "inventory.$.qty": item.requiredQty
                 }
              }
         )

         if(result.modifiedCount==0){
            await shopService.updateOne({ _id: requirementDocument.shopId},{$push : {inventory : {
                itemId: item.itemId,
                qty: item.requiredQty,
                status: true
            }}})
            
         }
         
    }
    
    return shop1; 
} 
export default {
    create,
    findByIdAndUpdate,
    find,
    newRequest,
    ViewAllRequests,
    requestApproval
}