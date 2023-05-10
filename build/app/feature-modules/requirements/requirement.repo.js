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
const requirement_schema_1 = require("./requirement.schema");
const create = (item) => requirement_schema_1.RequirementModel.create(item);
const find = (pipeline) => requirement_schema_1.RequirementModel.aggregate(pipeline);
const findOne = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield requirement_schema_1.RequirementModel.findOne(Object.assign(Object.assign({}, filters), { isDeleted: false }));
    }
    catch (err) {
        throw { message: 'sorry', e: err };
    }
});
const findByIdAndUpdate = (filter, update) => {
    return requirement_schema_1.RequirementModel.findByIdAndUpdate(filter, update);
};
const updateOne = (filter, update) => __awaiter(void 0, void 0, void 0, function* () {
    return requirement_schema_1.RequirementModel.updateOne(filter, update, { returnOriginal: false });
});
exports.default = {
    create,
    find,
    findOne,
    findByIdAndUpdate,
    updateOne
};
