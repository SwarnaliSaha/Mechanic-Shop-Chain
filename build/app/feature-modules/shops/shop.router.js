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
const shop_service_1 = __importDefault(require("./shop.service"));
const express_1 = require("express");
const middlewares_1 = require("../../utility/middlewares");
const shop_validation_1 = require("./shop.validation");
const role_type_1 = require("../roles/role.type");
const router = (0, express_1.Router)();
//ROUTER TO REGISTER A NEW SHOP
router.post('/RegisterShop', (0, middlewares_1.validateRole)([role_type_1.Roles.admin.toString()]), shop_validation_1.CREATE_SHOP_VALIDATION, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shop = req.body;
        //const {userName,email} = shop.ownerDetails;
        const result = yield shop_service_1.default.registerShop(shop);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//ADMIN CAN SEE THE LIST OF ALL SHOPS 
router.get('/ViewAllShop', (0, middlewares_1.validateRole)([role_type_1.Roles.admin.toString()]), shop_validation_1.VIEW_ALL_SHOPS, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const result = yield shop_service_1.default.ViewAllShop(query);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
//DELETE A SHOP BY ADMIN
router.delete('/deleteShop/:id', (0, middlewares_1.validateRole)([role_type_1.Roles.admin.toString()]), shop_validation_1.SHOP_ID_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shopId = req.params.id;
        const result = yield shop_service_1.default.deleteShop(new mongoose_1.Types.ObjectId(shopId));
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//ADMIN CAN UPDATE A SHOP
router.patch('/updateShop/:id', (0, middlewares_1.validateRole)([role_type_1.Roles.admin.toString()]), shop_validation_1.UPDATE_SHOP_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shopId = req.params.id;
        const updates = req.body;
        const result = yield shop_service_1.default.updateShop(new mongoose_1.Types.ObjectId(shopId), updates);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//ADMIN CAN APPROVE THE TRANSACTION
router.patch('/ApproveTransaction/:shopId', (0, middlewares_1.validateRole)([role_type_1.Roles.admin.toString()]), shop_validation_1.TRANSACTION_APPROVAL_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shopId = req.params.shopId;
        const { status } = req.body;
        const result = yield shop_service_1.default.transactionApproval(new mongoose_1.Types.ObjectId(shopId), status);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//SHOP OWNER ROUTES
//1. SHOP OWNER CAN VIEW THE RATING OF HIS OWN SHOP
router.get('/details/:shopId', (0, middlewares_1.validateRole)([role_type_1.Roles.shopKeeper.toString()]), shop_validation_1.VALIDATOR_FOR_OWNER, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const shopId = req.params.shopId;
        const result = yield shop_service_1.default.viewRating(new mongoose_1.Types.ObjectId(shopId), query);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//2. SHOP OWNER CAN VIEW THE LIST OF PRODUCTS WHICH HE HAS REQUESTED FOR
router.get('/MyRequirements/:shopId', (0, middlewares_1.validateRole)([role_type_1.Roles.shopKeeper.toString()]), shop_validation_1.VALIDATOR_FOR_OWNER, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const shopId = req.params.shopId;
        const result = yield shop_service_1.default.fetchRequirementDetails(new mongoose_1.Types.ObjectId(shopId), query);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//3. SHOP OWNER CAN VIEW THE LIST OF REWARDS WHICH HE HAS REQUESTED FOR
router.get('/MyRewardsRequests/:shopId', (0, middlewares_1.validateRole)([role_type_1.Roles.shopKeeper.toString()]), shop_validation_1.VALIDATOR_FOR_OWNER, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const shopId = req.params.shopId;
        const result = yield shop_service_1.default.fetchRewardsDetails(new mongoose_1.Types.ObjectId(shopId), query);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
