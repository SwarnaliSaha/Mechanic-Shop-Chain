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
const express_1 = require("express");
const user_service_1 = __importDefault(require("./user.service"));
const mongoose_1 = require("mongoose");
const response_handler_1 = require("../../utility/response-handler");
const middlewares_1 = require("../../utility/middlewares");
const role_type_1 = require("../roles/role.type");
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
//ADMIN CAN VIEW THE LIST OF ALL SHOP-OWNER
router.get('/viewallusers', (0, middlewares_1.validateRole)([role_type_1.Roles.admin.toString()]), user_validation_1.VIEW_ALL_OWNER, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const result = yield user_service_1.default.viewUsers(query);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//ADMIN CAN UPDATE THE DETAILS OF ANY SHOP-OWNER
router.patch('/UpdateOwner/:userId', (0, middlewares_1.validateRole)([role_type_1.Roles.admin.toString()]), user_validation_1.UPDATE_OWNER_VALIDATION, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield user_service_1.default.updateUser(new mongoose_1.Types.ObjectId(userId), req.body);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//ADMIN CAN DELETE ANY SHOP-OWNER
router.delete('/DeleteOwner/:userId', (0, middlewares_1.validateRole)([role_type_1.Roles.admin.toString()]), user_validation_1.OWNER_ID_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield user_service_1.default.deleteUser(new mongoose_1.Types.ObjectId(userId));
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
