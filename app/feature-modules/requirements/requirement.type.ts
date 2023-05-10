import { ObjectId } from "bson"

export interface IRequirement{
    _id :ObjectId,
    shopId:ObjectId,
    partsRequired :[IPartsRequired],
    isApproved : boolean
}

interface IPartsRequired {
    itemId : ObjectId,
    requiredQty : number
}