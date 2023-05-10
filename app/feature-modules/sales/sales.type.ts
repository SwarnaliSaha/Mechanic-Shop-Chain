import { ObjectId } from "bson";

export interface ISale{
    _id ?:ObjectId,
    customerName : string,
    customerEmail : string,
    shopId : ObjectId,
    itemsPurchased : [itemDetails],
    grandTotal ?: number
}

interface itemDetails {
    itemName : string,
    itemId : ObjectId,
    soldQty : number,
    subTotal ?: number
}