import { IInventory } from "./inventory.types";
import { BaseSchema } from "../../utility/base-schema";
import { model } from "mongoose";

const InventorySchema = new BaseSchema({
    itemName : {
        type:String,
        required:true
    },
    minLimit : {
        type:Number,
        required:true
    },
    price : {
        type:Number,
        required:true
    },
    isSpecial : {
        type:Boolean,
        default:false
    },
    points : {
        type:Number,
        default:0
    }
})

type InventoryDocument = Document & IInventory;
export const InventoryModel = model<InventoryDocument>("Inventory",InventorySchema);