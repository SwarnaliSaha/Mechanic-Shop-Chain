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
Object.defineProperty(exports, "__esModule", { value: true });
const shop_schema_1 = require("./shop.schema");
const mongoose_1 = require("mongoose");
const create = (shop) => shop_schema_1.ShopModel.create(shop);
const findOne = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield shop_schema_1.ShopModel.findOne(Object.assign(Object.assign({}, filters), { isDeleted: false }));
    }
    catch (err) {
        throw { message: 'sorry', e: err };
    }
});
const find = (pipeline) => shop_schema_1.ShopModel.aggregate(pipeline);
const updateOne = (filter, update) => __awaiter(void 0, void 0, void 0, function* () {
    return shop_schema_1.ShopModel.updateOne(filter, update);
});
const findItem = (shopId, curItemId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const record = yield shop_schema_1.ShopModel.findOne({
            "_id": new mongoose_1.Types.ObjectId(shopId),
            "inventory.itemId": curItemId
        }, {
            inventory: {
                $elemMatch: {
                    itemId: curItemId
                }
            }
        });
        return record;
    }
    catch (error) {
        console.log(error);
    }
});
const findByIdAndUpdate = (filter, update) => {
    return shop_schema_1.ShopModel.findByIdAndUpdate(filter, update);
};
exports.default = {
    create,
    findOne,
    updateOne,
    findItem,
    findByIdAndUpdate,
    find
};
