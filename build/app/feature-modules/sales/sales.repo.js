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
const sales_schema_1 = require("./sales.schema");
const create = (bill) => sales_schema_1.SaleModel.create(bill);
const find = (pipeline) => sales_schema_1.SaleModel.aggregate(pipeline);
const findOne = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield sales_schema_1.SaleModel.findOne(Object.assign(Object.assign({}, filters), { isDeleted: false }));
    }
    catch (err) {
        throw { message: 'sorry', e: err };
    }
});
const updateOne = (filter, update) => __awaiter(void 0, void 0, void 0, function* () {
    return sales_schema_1.SaleModel.updateOne(filter, update);
});
const dateWiseBill = (pipeline) => __awaiter(void 0, void 0, void 0, function* () { return yield sales_schema_1.SaleModel.aggregate(pipeline); });
exports.default = {
    create,
    find,
    findOne,
    updateOne,
    dateWiseBill
};
