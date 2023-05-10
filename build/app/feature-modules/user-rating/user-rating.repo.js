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
const user_rating_schema_1 = require("./user-rating.schema");
const shop_service_1 = __importDefault(require("../shops/shop.service"));
const mongoose_1 = require("mongoose");
const create = (rate) => user_rating_schema_1.RatingModel.create(rate);
const find = (filter = {}) => user_rating_schema_1.RatingModel.find(Object.assign(Object.assign({}, filter), { isDeleted: false }));
const avgRating = (pipeline) => __awaiter(void 0, void 0, void 0, function* () { return yield user_rating_schema_1.RatingModel.aggregate(pipeline); });
const avgOfAShop = (shopId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_rating_schema_1.RatingModel.aggregate([
        {
            $group: {
                _id: new mongoose_1.Types.ObjectId(shopId),
                avgRating: { $avg: "$rating" }
            }
        }
    ]);
    return yield shop_service_1.default.findByIdAndUpdate({ _id: shopId }, { $set: { rating: result[0].avgRating } });
});
exports.default = {
    create,
    avgRating,
    avgOfAShop,
    find
};
