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
const reward_req_repo_1 = __importDefault(require("./reward.req.repo"));
const shop_service_1 = __importDefault(require("../shops/shop.service"));
const shop_response_1 = require("../shops/shop-response");
const reward_service_1 = __importDefault(require("../rewards/reward.service"));
const pipeline_1 = require("../../utility/pipeline");
const reward_req_response_1 = require("./reward-req.response");
const create = (reward) => reward_req_repo_1.default.create(reward);
const find = (pipeline) => reward_req_repo_1.default.find(pipeline);
const findOne = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const rewardRequirement = yield reward_req_repo_1.default.findOne(filters);
    if (!rewardRequirement)
        throw "Not Found";
    return rewardRequirement;
});
const updateOne = (filter, update) => {
    return reward_req_repo_1.default.updateOne(filter, update);
};
//SHOP OWNER POSTS A NEW REQUEST FOR A REWARD
const newRewardRequest = (reward) => __awaiter(void 0, void 0, void 0, function* () {
    const record = yield create(reward);
    return record;
});
//ADMIN CAN VIEW ALL REWARD REDEMPTION REQUESTS
const ViewAllRewardsRequests = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = (0, pipeline_1.generatePipeline)(query);
    const result = yield reward_req_repo_1.default.find(pipeline);
    return result;
});
//ADMIN CAN APPROVE THE REWARD REQUEST
const approveRewardRequest = (reqId) => __awaiter(void 0, void 0, void 0, function* () {
    const requirementDocument = yield findOne({ _id: reqId, isApproved: false });
    const shop1 = yield shop_service_1.default.findOne({ _id: requirementDocument.shopId });
    if (!shop1)
        throw shop_response_1.SHOP_RESPONSES.SHOP_NOT_FOUND;
    const rewardObject = yield reward_service_1.default.findOne({ _id: requirementDocument.reward });
    const rewardPoint = rewardObject.rewardPoints;
    if (shop1.transactionApprovalStatus == true && rewardPoint <= shop1.points) {
        yield updateOne({ _id: reqId }, { $set: { isApproved: true } });
        yield shop_service_1.default.findByIdAndUpdate({ _id: requirementDocument.shopId }, { $inc: { points: -rewardPoint } });
        const result = yield shop_service_1.default.updateOne({ _id: requirementDocument.shopId }, {
            $push: {
                redeemedGifts: requirementDocument.reward
            }
        });
        return result;
    }
    else {
        throw reward_req_response_1.REWARD_REQ_RESPONSES.NON_APPROVAL;
    }
});
exports.default = {
    create,
    newRewardRequest,
    findOne,
    updateOne,
    ViewAllRewardsRequests,
    approveRewardRequest,
    find
};
