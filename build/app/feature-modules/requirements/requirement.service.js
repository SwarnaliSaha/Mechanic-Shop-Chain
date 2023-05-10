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
const requirement_repo_1 = __importDefault(require("./requirement.repo"));
const shop_service_1 = __importDefault(require("../shops/shop.service"));
const shop_response_1 = require("../shops/shop-response");
const pipeline_1 = require("../../utility/pipeline");
const requirement_responses_1 = require("./requirement.responses");
const create = (item) => requirement_repo_1.default.create(item);
const findOne = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(filters);
    const requirement = yield requirement_repo_1.default.findOne(filters);
    return requirement;
});
const find = (pipeline) => requirement_repo_1.default.find(pipeline);
const findByIdAndUpdate = (filter, update) => {
    return requirement_repo_1.default.findByIdAndUpdate(filter, update);
};
const updateOne = (filter, update) => {
    return requirement_repo_1.default.updateOne(filter, update);
};
//REQUEST FOR PRODUCTS BY THE SHOP-OWNER
const newRequest = (item) => __awaiter(void 0, void 0, void 0, function* () {
    const record = yield create(item);
    return record;
});
//ADMIN CAN VIEW THE LIST OF ALL REQUIREMENT REQUESTS
const ViewAllRequests = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = (0, pipeline_1.generatePipeline)(query);
    const result = yield requirement_repo_1.default.find(pipeline);
    return result;
});
//REQUEST APPROVAL BY THE ADMIN FOR THE PRODUCTS
const requestApproval = (reqId) => __awaiter(void 0, void 0, void 0, function* () {
    const requirementDocument = yield findOne({ _id: reqId, isApproved: false });
    if (!requirementDocument)
        throw requirement_responses_1.REQUIREMENT_RESPONSES.REQUIREMENT_NOT_FOUND;
    const shop1 = yield shop_service_1.default.findOne({ _id: requirementDocument.shopId });
    if (!shop1)
        shop_response_1.SHOP_RESPONSES.SHOP_NOT_FOUND;
    yield updateOne({ _id: reqId, isApproved: false }, { $set: { isApproved: true, isDeleted: true } });
    for (let item of requirementDocument.partsRequired) {
        const result = yield shop_service_1.default.updateOne({ _id: requirementDocument.shopId, "inventory.itemId": item.itemId }, {
            $inc: {
                "inventory.$.qty": item.requiredQty
            }
        });
        if (result.modifiedCount == 0) {
            yield shop_service_1.default.updateOne({ _id: requirementDocument.shopId }, { $push: { inventory: {
                        itemId: item.itemId,
                        qty: item.requiredQty,
                        status: true
                    } } });
        }
    }
    return shop1;
});
exports.default = {
    create,
    findByIdAndUpdate,
    find,
    newRequest,
    ViewAllRequests,
    requestApproval
};
