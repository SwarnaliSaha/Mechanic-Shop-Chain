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
const bcryptjs_1 = require("bcryptjs");
const user_response_1 = require("./user-response");
const user_repo_1 = __importDefault(require("./user.repo"));
const pipeline_1 = require("../../utility/pipeline");
const encryptedPassword = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield (0, bcryptjs_1.genSalt)(10);
    const hashedPassword = yield (0, bcryptjs_1.hash)(user.password, salt);
    user.password = hashedPassword;
    return user;
});
const create = (user) => user_repo_1.default.create(user);
const findOne = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_repo_1.default.findOne(filters);
    if (!user)
        throw user_response_1.UserResponse.USER_NOT_FOUND;
    return user;
});
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    user = yield encryptedPassword(user);
    const record = yield create(user);
    console.log(record);
    return record;
});
//ADMIN CAN VIEW THE LIST OF ALL SHOP-OWNERS
const viewUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = (0, pipeline_1.generatePipeline)(query);
    return user_repo_1.default.find(pipeline);
});
//ADMIN CAN UPDATE THE DETAILS OF ANY SHOP-OWNER
const updateUser = (userId, updatedObject) => __awaiter(void 0, void 0, void 0, function* () {
    return user_repo_1.default.findByIdAndUpdate({ _id: userId }, { $set: updatedObject });
});
//ADMIN CAN DELETE ANY USER
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return user_repo_1.default.findByIdAndUpdate({ _id: userId }, { $set: {
            isDeleted: true
        } });
});
exports.default = {
    create,
    findOne,
    registerUser,
    updateUser,
    deleteUser,
    viewUsers
};
