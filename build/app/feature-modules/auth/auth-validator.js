"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN_VALIDATOR = exports.LOGIN_VALIDATOR = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.LOGIN_VALIDATOR = [
    (0, express_validator_1.body)("email").isEmail().notEmpty().withMessage("Provide a valid email id"),
    (0, express_validator_1.body)("password").isString().notEmpty().isLength({ min: 3 }).withMessage("Must contain atleat 3 characters"),
    validate_1.validate
];
exports.REFRESH_TOKEN_VALIDATOR = [
    (0, express_validator_1.body)("refreshToken").isString().notEmpty().withMessage("Please provide the refresh token to get a new access token"),
    validate_1.validate
];
