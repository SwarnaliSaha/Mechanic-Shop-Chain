import { FilterQuery,UpdateQuery } from "mongoose";
import { ObjectId } from "bson";
import rewardRepo from "./reward.repo";
import { IRewards } from "./reward.type";
import { REWARD_RESPONSES } from "./reward.response";
import { generatePipeline } from "../../utility/pipeline";
import shopService from "../shops/shop.service";
import { SHOP_RESPONSES } from "../shops/shop-response";

const create = (reward:IRewards)=>rewardRepo.create(reward);

const findByIdAndUpdate = (filter: FilterQuery<IRewards>, update: UpdateQuery<IRewards>) => {
    return rewardRepo.findByIdAndUpdate(filter, update)
}

const findOne = async (filters:Partial<IRewards>) => {
    const reward = await rewardRepo.findOne(filters);
    if(!reward) throw REWARD_RESPONSES.REWARD_NOT_FOUND;
    
    return reward;
}

const find = async(pipeline:any) => rewardRepo.find(pipeline);

const addNewReward = (reward:IRewards) => {
    let record = create(reward);

    return record;
}

//VIEW ALL REWARDS FOR THE ADMIN
const ViewAllRewards = async(query:any)=>{

    const pipeline = generatePipeline(query);
    const result = await rewardRepo.find(pipeline);

    return result;
}

//SHOP-OWNER,WHILE REQUESTING CAN ONLY VIEW THE REWARDS HE CAN HAVE WITH THE CURRENT POINTS
const availableRewards = async(shopId:ObjectId,query:any)=>{
    const shop = await shopService.findOne({_id:shopId});
    if(!shop) throw SHOP_RESPONSES.SHOP_NOT_FOUND;

    const curShopPoints = shop.points;

    const pipeline = generatePipeline(query);

    const aggregate = [
        {
            $facet : {
                UpcomingReward : [
                    {
                        $match : {
                            rewardPoints : {
                                $gt : curShopPoints
                            }
                        }
                    },
                    {
                        $sort : {
                            rewardPoints : 1
                        }
                    },
                    {
                        $limit : 1
                    }
                ],
                availableRewards : [
                    {
                        $match : {
                            rewardPoints : {
                                $lte : curShopPoints
                            }
                        }
                    }
                ]
            }
        },
        ...pipeline
    ]

    console.log(aggregate);
    return await find(aggregate);
}

export default {
    create,
    findByIdAndUpdate,
    addNewReward,
    findOne,
    find,
    ViewAllRewards,
    availableRewards
}