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
const inventory_repo_1 = __importDefault(require("./inventory.repo"));
const response_1 = require("./response");
const mongoose_1 = require("mongoose");
const pipeline_1 = require("../../utility/pipeline");
const create = (item) => inventory_repo_1.default.create(item);
const findOne = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    filters._id = new mongoose_1.Types.ObjectId(filters._id);
    const part = yield inventory_repo_1.default.findOne(filters);
    console.log(part);
    if (!part)
        throw response_1.PartsFound.PART_NOT_FOUND;
    return part;
});
const findByIdAndUpdate = (filter, update) => {
    return inventory_repo_1.default.findByIdAndUpdate(filter, update);
};
const addItem = (item) => {
    let record = create(item);
    return record;
};
//ADMIN CAN VIEW THE LIST OF ALL PRODUCTS
const ViewAllProducts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = (0, pipeline_1.generatePipeline)(query);
    const result = yield inventory_repo_1.default.find(pipeline);
    return result;
});
exports.default = {
    create,
    addItem,
    findByIdAndUpdate,
    findOne,
    ViewAllProducts
};
