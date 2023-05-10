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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shop_repo_1 = __importDefault(require("./shop.repo"));
const mongoose_1 = require("mongoose");
const role_type_1 = require("../roles/role.type");
const user_service_1 = __importDefault(require("../users/user.service"));
const shop_response_1 = require("./shop-response");
const pipeline_1 = require("../../utility/pipeline");
const requirement_service_1 = __importDefault(require("../requirements/requirement.service"));
const reward_req_service_1 = __importDefault(require("../reward-req/reward.req.service"));
const create = (shop) => shop_repo_1.default.create(shop);
const findOne = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const shop = yield shop_repo_1.default.findOne(filters);
    if (!shop)
        throw shop_response_1.SHOP_RESPONSES.SHOP_NOT_FOUND;
    return shop;
});
const updateOne = (filter, update) => {
    return shop_repo_1.default.updateOne(filter, update);
};
const findItem = (shopId, curItemId) => __awaiter(void 0, void 0, void 0, function* () {
    const record = yield shop_repo_1.default.findItem(shopId, curItemId);
    console.log(record);
    if (!record)
        throw "Sorry";
    return record;
});
const findByIdAndUpdate = (filter, update) => {
    return shop_repo_1.default.findByIdAndUpdate(filter, update);
};
//ADMIN REGISTERS A NEW SHOP
const registerShop = (shop) => __awaiter(void 0, void 0, void 0, function* () {
    shop.ownerDetails.role = role_type_1.Roles.shopKeeper;
    let record = yield create(shop);
    const UserData = {
        role: shop.ownerDetails.role,
        password: shop.ownerDetails.password,
        shopId: record._id,
        userName: shop.ownerDetails.userName,
        email: shop.ownerDetails.email
    };
    const userResult = yield user_service_1.default.registerUser(UserData);
    return record;
});
//ADMIN CAN VIEW THE LIST OF ALL SHOPS,SORT THEM ACCORDINGLY,FILTER THEM ACCORDINGLY WITH PAGINATION
const ViewAllShop = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { shopId } = query, filter = __rest(query, ["shopId"]);
    const pipeline = (0, pipeline_1.generatePipeline)(filter);
    const aggregate = [];
    if (shopId) {
        aggregate.push({
            $match: {
                _id: new mongoose_1.Types.ObjectId(shopId)
            }
        });
    }
    aggregate.push(...pipeline);
    const result = yield shop_repo_1.default.find(aggregate);
    return result;
});
//ADMIN CAN UPDATE THE DETAILS OF ANY SHOP
const updateShop = (shopId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    return yield updateOne({ _id: shopId }, { $set: updates
    });
});
//ADMIN CAN DELETE ANY SHOP
const deleteShop = (shopId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield updateOne({ _id: shopId }, { $set: {
            isDeleted: true
        } });
});
//ADMIN CAN APPROVE OR REJECT THE TRANSACTION STATUS OF A SHOP
const transactionApproval = (shopId, status) => __awaiter(void 0, void 0, void 0, function* () {
    if (status == true) {
        const shop = yield findOne({ _id: shopId });
        const result = yield updateOne({ _id: shopId }, { $set: {
                transactionApprovalStatus: status,
                points: shop.pendingPoints,
                pendingPoints: 0
            } });
        return result;
    }
    else {
        const result = yield updateOne({ _id: shopId }, { $set: {
                transactionApprovalStatus: status,
                points: 0,
                revenue: 0
            } });
        return result;
    }
});
//1. SHOP-OWNER CAN VIEW THE DETAILS OF ITS OWN SHOP
const viewRating = (shopId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = (0, pipeline_1.generatePipeline)(query);
    const aggregate = [
        {
            $match: {
                _id: shopId
            }
        },
        {
            $project: {
                _id: 1,
                shopName: 1,
                rating: 1,
                inventory: 1,
                points: 1,
                redeemedGifts: 1
            }
        },
        ...pipeline
    ];
    return yield shop_repo_1.default.find(aggregate);
});
//2. SHOP OWNER CAN VIEW THE LIST OF PRODUCTS HE HAS ASKED FOR
const fetchRequirementDetails = (shopId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = (0, pipeline_1.generatePipeline)(query);
    const aggregate = [
        {
            $match: {
                shopId: shopId
            }
        },
        ...pipeline
    ];
    return yield requirement_service_1.default.find(aggregate);
});
//3. SHOP OWNER CAN VIEW THE LIST OF REWARDS HE HAS ASKED FOR
const fetchRewardsDetails = (shopId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = (0, pipeline_1.generatePipeline)(query);
    const aggregate = [
        {
            $match: {
                shopId: shopId
            }
        },
        ...pipeline
    ];
    return yield reward_req_service_1.default.find(aggregate);
});
exports.default = {
    create,
    findOne,
    updateOne,
    findItem,
    findByIdAndUpdate,
    registerShop,
    ViewAllShop,
    updateShop,
    deleteShop,
    transactionApproval,
    viewRating,
    fetchRequirementDetails,
    fetchRewardsDetails
};
