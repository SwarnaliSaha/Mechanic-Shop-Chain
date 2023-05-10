import { IUser } from "./user.type";
import { BaseSchema } from "../../utility/base-schema";
import { Schema, model } from "mongoose";

const UserSchema = new BaseSchema({
    userName : {
        type:String,
        required:true
    },
    role:{
        type:Schema.Types.ObjectId,
        ref:'Roles',
    },
    shopId: {
        type:Schema.Types.ObjectId,
        ref:'Shops',
    },
    email : {
        type:String,
        required:true
    },
    password : {
        type : String,
        required:true
    }
})
type UserDocument = Document & IUser;
export const UserModel = model<UserDocument>("Users",UserSchema);