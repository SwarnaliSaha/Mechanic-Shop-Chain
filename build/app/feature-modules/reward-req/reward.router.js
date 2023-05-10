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
const reward_req_service_1 = __importDefault(require("./reward.req.service"));
const express_1 = require("express");
const middlewares_1 = require("../../utility/middlewares");
const reward_req_validator_1 = require("./reward-req.validator");
const role_type_1 = require("../roles/role.type");
const router = (0, express_1.Router)();
//SHOP-OWNER MAKES NEW REQUEST FOR REWARD
router.post('/RewardRequest', (0, middlewares_1.validateRole)([role_type_1.Roles.shopKeeper.toString()]), reward_req_validator_1.REWARD_REQUEST_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield reward_req_service_1.default.newRewardRequest(req.body);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//ADMIN CAN VIEW THE LIST OF ALL REWARD REQUESTS
router.get('/ViewAllRedeemRequests', (0, middlewares_1.validateRole)([role_type_1.Roles.admin.toString()]), reward_req_validator_1.VIEW_ALL_REDEEM_REQUESTS_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const result = yield reward_req_service_1.default.ViewAllRewardsRequests(query);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//ADMIN CAN APPROVE OR REJECT ANY REWARD REQUEST
router.patch("/ApproveRewad/:reqId", (0, middlewares_1.validateRole)([role_type_1.Roles.admin.toString()]), reward_req_validator_1.APPROVE_REWARD_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let reqId = req.params.reqId;
        const result = yield reward_req_service_1.default.approveRewardRequest(new mongoose_1.Types.ObjectId(reqId));
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
