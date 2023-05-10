import { ObjectId } from "bson";

export interface IShop{
    _id ?:ObjectId,
    shopName : string,
    ownerDetails : IOwnerDetails,
    password : string,
    inventory :[IInventoryObject],
    points :number,
    pendingPoints : number,
    revenue :number,
    transactionApprovalStatus ?:boolean,
    redeemedGifts : [string],
    rating : number
}

interface IInventoryObject {
    itemId: ObjectId,
    qty:number,
    status:boolean
}

interface IOwnerDetails {
    role ?:ObjectId,
    userName : string,
    shopId : ObjectId,
    email : string,
    password : string
}