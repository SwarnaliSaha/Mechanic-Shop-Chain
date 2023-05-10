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
const mongoose_1 = require("mongoose");
const response_handler_1 = require("../../utility/response-handler");
const requirement_service_1 = __importDefault(require("./requirement.service"));
const express_1 = require("express");
const middlewares_1 = require("../../utility/middlewares");
const requirement_validator_1 = require("./requirement.validator");
const role_type_1 = require("../roles/role.type");
const router = (0, express_1.Router)();
//SHOP-OWNER CAN MAKE A NEW REQUEST FOR PRODUCT
router.post('/AddRequest', (0, middlewares_1.validateRole)([role_type_1.Roles.shopKeeper.toString()]), requirement_validator_1.ADD_REQUEST_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestedProducts = req.body;
        const result = yield requirement_service_1.default.newRequest(requestedProducts);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//ADMIN CAN VIEW THE LIST OF ALL REQUIREMENT REQUESTS
router.get('/ViewAllRequests', (0, middlewares_1.validateRole)([role_type_1.Roles.admin.toString()]), requirement_validator_1.VIEW_ALL_REQUESTS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const result = yield requirement_service_1.default.ViewAllRequests(query);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//ADMIN CAN APPROVE THE REQUEST FOR PRODUCT MADE BY THE SHOP-OWNER
router.post('/ApproveRequest/:reqId', (0, middlewares_1.validateRole)([role_type_1.Roles.admin.toString()]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let reqId = req.params.reqId;
        const result = yield requirement_service_1.default.requestApproval(new mongoose_1.Types.ObjectId(reqId));
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
