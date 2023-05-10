import mongoose from "mongoose"

export interface IRole{
    _id:string,
    name:string
}
export const Roles = {
    admin:new mongoose.mongo.ObjectId("643eb96fc8f5f358c3db8d0f"),
    shopKeeper:new mongoose.mongo.ObjectId("643eb983c8f5f358c3db8d12")
}