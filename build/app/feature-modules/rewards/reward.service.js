"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reward_repo_1 = __importDefault(require("./reward.repo"));
const reward_response_1 = require("./reward.response");
const pipeline_1 = require("../../utility/pipeline");
const shop_service_1 = __importDefault(require("../shops/shop.service"));
const shop_response_1 = require("../shops/shop-response");
const create = (reward) => reward_repo_1.default.create(reward);
const findByIdAndUpdate = (filter, update) => {
    return reward_repo_1.default.findByIdAndUpdate(filter, update);
};
const findOne = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const reward = yield reward_repo_1.default.findOne(filters);
    if (!reward)
        throw reward_response_1.REWARD_RESPONSES.REWARD_NOT_FOUND;
    return reward;
});
const find = (pipeline) => __awaiter(void 0, void 0, void 0, function* () { return reward_repo_1.default.find(pipeline); });
const addNewReward = (reward) => {
    let record = create(reward);
    return record;
};
//VIEW ALL REWARDS FOR THE ADMIN
const ViewAllRewards = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = (0, pipeline_1.generatePipeline)(query);
    const result = yield reward_repo_1.default.find(pipeline);
    return result;
});
//SHOP-OWNER,WHILE REQUESTING CAN ONLY VIEW THE REWARDS HE CAN HAVE WITH THE CURRENT POINTS
const availableRewards = (shopId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const shop = yield shop_service_1.default.findOne({ _id: shopId });
    if (!shop)
        throw shop_response_1.SHOP_RESPONSES.SHOP_NOT_FOUND;
    const curShopPoints = shop.points;
    const pipeline = (0, pipeline_1.generatePipeline)(query);
    const aggregate = [
        {
            $facet: {
                UpcomingReward: [
                    {
                        $match: {
                            rewardPoints: {
                                $gt: curShopPoints
                            }
                        }
                    },
                    {
                        $sort: {
                            rewardPoints: 1
                        }
                    },
                    {
                        $limit: 1
                    }
                ],
                availableRewards: [
                    {
                        $match: {
                            rewardPoints: {
                                $lte: curShopPoints
                            }
                        }
                    }
                ]
            }
        },
        ...pipeline
    ];
    console.log(aggregate);
    return yield find(aggregate);
});
exports.default = {
    create,
    findByIdAndUpdate,
    addNewReward,
    findOne,
    find,
    ViewAllRewards,
    availableRewards
};
