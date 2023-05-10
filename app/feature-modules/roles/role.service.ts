import { ObjectId } from "bson";
import roleRepo from "./role.repo";
import { IRole } from "./role.type";

const create = (role:IRole)=>roleRepo.create(role);

const deleteRole = async(roleId:ObjectId)=>{
    return roleRepo.updateOne(
        {_id:roleId},
        {$set : {
            isDeleted : true
        }}
    )
}

export default {
    create,
    deleteRole
}