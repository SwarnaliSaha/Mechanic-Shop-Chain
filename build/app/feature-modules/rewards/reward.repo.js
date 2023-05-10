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
const reward_schema_1 = require("./reward.schema");
const create = (reward) => reward_schema_1.RewardsModel.create(reward);
const findByIdAndUpdate = (filter, update) => {
    return reward_schema_1.RewardsModel.findByIdAndUpdate(filter, update);
};
const find = (pipeline) => reward_schema_1.RewardsModel.aggregate(pipeline);
const findOne = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield reward_schema_1.RewardsModel.findOne(Object.assign(Object.assign({}, filters), { isDeleted: false }));
    }
    catch (err) {
        throw { message: 'sorry', e: err };
    }
});
exports.default = {
    create,
    findByIdAndUpdate,
    find,
    findOne
};
