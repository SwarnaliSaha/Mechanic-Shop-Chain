import { FilterQuery, UpdateQuery } from "mongoose";
import { RoleModel } from "./role.schema";
import { IRole } from "./role.type";

const create = (role:IRole)=>RoleModel.create(role);

const updateOne = async (filter:FilterQuery<IRole>,update:UpdateQuery<IRole>) => {
    return RoleModel.updateOne(filter,update);
}

export default {
    create,
    updateOne
};