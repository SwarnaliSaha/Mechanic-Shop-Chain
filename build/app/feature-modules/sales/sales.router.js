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
const middlewares_1 = require("../../utility/middlewares");
const response_handler_1 = require("../../utility/response-handler");
const role_type_1 = require("../roles/role.type");
const sales_validation_1 = require("./sales-validation");
const sales_service_1 = __importDefault(require("./sales.service"));
const express_1 = require("express");
const router = (0, express_1.Router)();
//SHOP-OWNER GENERATES THE BILL
router.post('/GenerateBill', (0, middlewares_1.validateRole)([role_type_1.Roles.shopKeeper.toString()]), sales_validation_1.GENERATE_BILL_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bill = req.body;
        const result = yield sales_service_1.default.generateBill(bill);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}));
//SHOP OWNER CAN DELETE ANY BILL
router.delete('/DeleteBill/:reqId', (0, middlewares_1.validateRole)([role_type_1.Roles.shopKeeper.toString()]), sales_validation_1.DELETE_BILL_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqId = req.params.reqId;
        const result = yield sales_service_1.default.deleteSale(new mongoose_1.Types.ObjectId(reqId));
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//ADMIN CAN VIEW ALL THE BILLS
router.get('/GetBills', (0, middlewares_1.validateRole)([role_type_1.Roles.admin.toString()]), sales_validation_1.VIEW_BILL_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        console.log(query);
        const result = yield sales_service_1.default.viewBills(query);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}));
//ADMIN CAN VIEW THE ITEM WISE HIGHEST SELLER
router.get('/ItemWiseSeller', (0, middlewares_1.validateRole)([role_type_1.Roles.admin.toString()]), sales_validation_1.ITEM_WISE_SELLER_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const result = yield sales_service_1.default.itemWiseHighestSeller(query);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
