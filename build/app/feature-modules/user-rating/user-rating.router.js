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
const user_rating_service_1 = __importDefault(require("./user-rating.service"));
const response_handler_1 = require("../../utility/response-handler");
const middlewares_1 = require("../../utility/middlewares");
const user_rating_validation_1 = require("./user-rating.validation");
const role_type_1 = require("../roles/role.type");
const router = (0, express_1.Router)();
//USER CAN GIVE RATING TO ANY SHOP
router.post('/', user_rating_validation_1.USER_RATING_VALIDATION, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_rating_service_1.default.create(req.body);
        res.send(new response_handler_1.ResponseHandler("thank you for rating our shop"));
    }
    catch (error) {
        next(error);
    }
}));
//TO FETCH THE AVG RATING OF ALL SHOPS TO THE ADMIN
router.get('/getAvgRating', (0, middlewares_1.validateRole)([role_type_1.Roles.admin.toString()]), user_rating_validation_1.GET_ALL_AVG_RATING, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        console.log(query);
        const result = yield user_rating_service_1.default.avgRating(query);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
exports.default = router;
