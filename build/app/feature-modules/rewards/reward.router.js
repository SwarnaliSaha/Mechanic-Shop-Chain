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
const reward_service_1 = __importDefault(require("./reward.service"));
const express_1 = require("express");
const response_handler_1 = require("../../utility/response-handler");
const middlewares_1 = require("../../utility/middlewares");
const reward_validator_1 = require("./reward-validator");
const mongoose_1 = require("mongoose");
const role_type_1 = require("../roles/role.type");
const router = (0, express_1.Router)();
//ADMIN CAN ADD A NEW REWARD TO THE REWARDS LIST
router.post("/AddRewards", (0, middlewares_1.validateRole)([role_type_1.Roles.admin.toString()]), reward_validator_1.ADD_REWARD_VALIDATOR, (req, res, next) => {
    try {
        const newReward = req.body;
        const result = reward_service_1.default.addNewReward(newReward);
        res.send("Reward is added successfully to the database");
    }
    catch (error) {
        next(error);
    }
});
//ADMIN CAN VIEW THE LIST OF ALL REWARDS
router.get('/ViewAllRewards', (0, middlewares_1.validateRole)([role_type_1.Roles.admin.toString()]), reward_validator_1.VIEW_REWARD_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const result = yield reward_service_1.default.ViewAllRewards(query);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
//ADMIN CAN UPDATE ANY REWARD FROM REWARD LIST
router.patch('/UpdateReward/:id', (0, middlewares_1.validateRole)([role_type_1.Roles.admin.toString()]), reward_validator_1.UPDATE_REWARD_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedObject = req.body;
    const rewardToUpdate = req.params.id;
    const result = yield reward_service_1.default.findByIdAndUpdate({ _id: rewardToUpdate }, { $set: updatedObject });
    res.send(new response_handler_1.ResponseHandler(result));
}));
//ADMIN CAN DELETE ANY REWARD ITEM FROM THE REWARDS LIST
router.delete('/DeleteReward/:id', (0, middlewares_1.validateRole)([role_type_1.Roles.admin.toString()]), reward_validator_1.DELETE_REWARD_VALIDATAOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const rewardToBeDeleted = req.params.id;
    const result = yield reward_service_1.default.findByIdAndUpdate({ _id: rewardToBeDeleted }, { isDeleted: true });
    res.send(new response_handler_1.ResponseHandler(result));
}));
router.get('/AvailableRewards/:shopId', (0, middlewares_1.validateRole)([role_type_1.Roles.shopKeeper.toString()]), reward_validator_1.SHOPID_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let shopId = req.params.shopId;
        let query = req.query;
        const result = yield reward_service_1.default.availableRewards(new mongoose_1.Types.ObjectId(shopId), query);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}));
exports.default = router;
