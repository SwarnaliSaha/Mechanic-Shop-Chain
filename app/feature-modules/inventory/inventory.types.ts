import { ObjectId } from "bson";

export interface IInventory{
    _id ?:ObjectId,
    itemName: string,
    minLimit : number,
    price : number,
    isSpecial : boolean,
    points : number
}
