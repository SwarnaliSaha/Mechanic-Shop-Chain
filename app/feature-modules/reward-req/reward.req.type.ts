import { ObjectId } from "bson"

export interface IRewardRequirement{
    _id :ObjectId,
    shopId:ObjectId,
    reward : ObjectId,
    isApproved : boolean
}