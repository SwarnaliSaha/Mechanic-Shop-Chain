import { ObjectId } from "bson";

export interface IUser{
    _id ?:ObjectId,
    userName : string,
    role ?: ObjectId,
    email : string,
    password : string
}