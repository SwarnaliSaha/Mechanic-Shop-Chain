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
const inventory_schema_1 = require("./inventory.schema");
const create = (item) => inventory_schema_1.InventoryModel.create(item);
const findOne = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield inventory_schema_1.InventoryModel.findOne(Object.assign(Object.assign({}, filters), { isDeleted: false }));
    }
    catch (err) {
        throw { message: 'sorry', e: err };
    }
});
const find = (pipeline) => inventory_schema_1.InventoryModel.aggregate(pipeline);
const findByIdAndUpdate = (filter, update) => {
    return inventory_schema_1.InventoryModel.findByIdAndUpdate(filter, update);
};
exports.default = {
    create,
    findOne,
    find,
    findByIdAndUpdate
};
