import { ObjectId } from "bson";

export interface IRewards{
    _id ?:ObjectId,
    rewardName : string,
    rewardPoints : number
}
