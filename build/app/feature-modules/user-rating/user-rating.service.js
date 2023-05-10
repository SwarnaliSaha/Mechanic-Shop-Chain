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
const mongoose_1 = require("mongoose");
const user_rating_repo_1 = __importDefault(require("./user-rating.repo"));
const pipeline_1 = require("../../utility/pipeline");
const shop_service_1 = __importDefault(require("../shops/shop.service"));
const create = (rate) => __awaiter(void 0, void 0, void 0, function* () {
    user_rating_repo_1.default.create(rate);
    const result = [
        {
            $group: {
                _id: new mongoose_1.Types.ObjectId(rate.shopId),
                avgRating: { $avg: "$rating" }
            }
        }
    ];
    const avgRating = yield user_rating_repo_1.default.avgRating(result);
    return yield shop_service_1.default.findByIdAndUpdate({ _id: rate.shopId }, { $set: { rating: avgRating[0].avgRating } });
});
//TO GET THE AVG RATING OF ALL SHOPS
const avgRating = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = (0, pipeline_1.generatePipeline)(query);
    console.log(pipeline);
    const aggregate = yield user_rating_repo_1.default.avgRating([
        {
            $group: {
                _id: '$shopId',
                avgRating: { $avg: "$rating" }
            },
        },
        ...pipeline
    ]);
    console.log(aggregate);
    return aggregate;
});
exports.default = {
    create,
    avgRating
};
