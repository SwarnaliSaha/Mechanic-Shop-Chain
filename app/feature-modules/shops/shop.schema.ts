import { BaseSchema } from "../../utility/base-schema";
import { IShop } from "./shop.type";
import { Schema, model } from "mongoose";

const ShopSchema = new BaseSchema({
    shopName: {
        type:String
    },
    inventory : [
        {
            itemId :{
                type:Schema.Types.ObjectId,
                ref:'Inventory',
                required:true
            },
            qty : {
                type:Number
            },
            status : {
                type : Boolean
            }
        }
    ],
    points : {
        type:Number,
        default:0
    },
    pendingPoints : {
        type:Number,
        default:0
    },
    revenue : {
        type:Number,
        default : 0
    },
    transactionApprovalStatus : {
        type:Boolean,
        default:false
    },
    redeemedGifts : {
        type : [String]
    },
    rating : {
        type : Number,
        default:0
    }
})

type ShopDocument = Document & IShop;
export const ShopModel = model<ShopDocument>("Shops",ShopSchema);