"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_ROLE_VALIDATION = exports.REGISTER_ROLE_VALIDATION = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.REGISTER_ROLE_VALIDATION = [
    (0, express_validator_1.body)("name").isString().notEmpty().withMessage("Provide a valid role name"),
    validate_1.validate
];
exports.DELETE_ROLE_VALIDATION = [
    (0, express_validator_1.param)("roleId").isString().notEmpty().withMessage("Provide a valid role id"),
    validate_1.validate
];
