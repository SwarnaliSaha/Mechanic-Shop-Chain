import { IRole,Roles } from "./role.type";
import { BaseSchema } from "../../utility/base-schema";
import { model } from "mongoose";

const RoleSchema = new BaseSchema({
    name:{
        type:String,
        required:true
    }
})
type RoleDocument = Document & IRole;
export const RoleModel = model<RoleDocument>("Roles",RoleSchema);