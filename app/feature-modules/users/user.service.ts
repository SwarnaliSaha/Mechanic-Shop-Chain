import { genSalt, hash } from "bcryptjs";
import { UserResponse } from "./user-response";
import userRepo from "./user.repo";
import { IUser } from "./user.type";
import { ObjectId } from "bson";
import { generatePipeline } from "../../utility/pipeline";

const encryptedPassword = async (user:IUser)=>{
    const salt = await genSalt(10);
    
    const hashedPassword = await hash(user.password,salt);
    user.password = hashedPassword;
    return user;
}

const create = (user:IUser)=>userRepo.create(user);

const findOne = async (filters:Partial<IUser>) => {
    const user = await userRepo.findOne(filters);
    if(!user) throw UserResponse.USER_NOT_FOUND
    
    return user;
}

const registerUser = async(user:IUser)=>{
    user = await encryptedPassword(user);
    const record = await create(user);

    console.log(record);
    return record;
}

//ADMIN CAN VIEW THE LIST OF ALL SHOP-OWNERS
const viewUsers = async(query:any) => {
    const pipeline = generatePipeline(query);

    return userRepo.find(pipeline);
}

//ADMIN CAN UPDATE THE DETAILS OF ANY SHOP-OWNER
const updateUser = async(userId:ObjectId,updatedObject:Object) => {
    return userRepo.findByIdAndUpdate(
        {_id:userId},
        {$set : updatedObject}
    )
}

//ADMIN CAN DELETE ANY USER
const deleteUser = async(userId:ObjectId)=>{
    return userRepo.findByIdAndUpdate(
        {_id:userId},
        {$set : {
            isDeleted : true
        }}
    )
}

export default {
    create,
    findOne,
    registerUser,
    updateUser,
    deleteUser,
    viewUsers
}