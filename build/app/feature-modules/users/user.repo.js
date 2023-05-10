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
const user_schema_1 = require("./user.schema");
const create = (user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user);
    const result = yield user_schema_1.UserModel.create(user);
    console.log(result);
    return result;
});
const find = (pipeline) => user_schema_1.UserModel.aggregate(pipeline);
const findOne = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield user_schema_1.UserModel.findOne(Object.assign(Object.assign({}, filters), { isDeleted: false }));
    }
    catch (err) {
        throw { message: 'sorry', e: err };
    }
});
const findByIdAndUpdate = (filter, update) => {
    return user_schema_1.UserModel.findByIdAndUpdate(filter, update);
};
exports.default = {
    create,
    find,
    findOne,
    findByIdAndUpdate
};
