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
const role_service_1 = __importDefault(require("./role.service"));
const response_handler_1 = require("../../utility/response-handler");
const roles_validation_1 = require("./roles.validation");
const middlewares_1 = require("../../utility/middlewares");
const role_type_1 = require("./role.type");
const mongoose_1 = require("mongoose");
const router = (0, express_1.Router)();
router.post('/RegisterRole', (0, middlewares_1.validateRole)([role_type_1.Roles.admin.toString()]), roles_validation_1.REGISTER_ROLE_VALIDATION, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield role_service_1.default.create(req.body);
        const data = yield result.save();
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
router.delete('/DeleteRole/:roleId', (0, middlewares_1.validateRole)([role_type_1.Roles.admin.toString()]), roles_validation_1.DELETE_ROLE_VALIDATION, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roleId = req.params.roleId;
        const result = yield role_service_1.default.deleteRole(new mongoose_1.Types.ObjectId(roleId));
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
