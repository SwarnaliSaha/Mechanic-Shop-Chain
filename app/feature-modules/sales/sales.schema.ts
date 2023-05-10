import { BaseSchema } from "../../utility/base-schema";
import { ISale } from "./sales.type";
import { Schema, model } from "mongoose";

const SaleSchema = new BaseSchema({
    customerName : {
        type:String,
        required:true
    },
    customerEmail : {
        type:String,
        required:true
    },
    shopId : {
        type:Schema.Types.ObjectId,
        ref:'Shops',
        required:true
    },
    itemsPurchased : [
        {
           itemName : {
              type:String,
              required:true
           } ,
           itemId : {
                type:Schema.Types.ObjectId,
                ref:'Inventory',
                required:true
           } ,
           soldQty : {
                type:Number,
                required:true
           },
           subTotal : {
            type:Number
           }
        }
    ],
    grandTotal : {
        type: Number
    }
});

type SaleDocument = Document & ISale;
export const SaleModel = model<SaleDocument>("Sales",SaleSchema);