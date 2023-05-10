"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHOPID_VALIDATOR = exports.APPROVE_REWARD_VALIDATOR = exports.VIEW_ALL_REDEEM_REQUESTS_VALIDATOR = exports.REWARD_REQUEST_VALIDATOR = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.REWARD_REQUEST_VALIDATOR = [
    (0, express_validator_1.body)("shopId").isString().notEmpty().withMessage("Please provide the valid shop id"),
    (0, express_validator_1.body)("reward").isString().notEmpty().withMessage("Please provide the name of the reward"),
    validate_1.validate
];
exports.VIEW_ALL_REDEEM_REQUESTS_VALIDATOR = [
    (0, express_validator_1.query)("sort").optional({ nullable: true }).isString().withMessage("must be a string"),
    (0, express_validator_1.query)("page").optional({ nullable: true }).isString().withMessage("must be a string"),
    (0, express_validator_1.query)("limit").optional({ nullable: true }).isString().withMessage("must be a string"),
    (0, express_validator_1.query)("reward").optional({ nullable: true }).isString().withMessage("must be a valid reward name"),
    validate_1.validate
];
exports.APPROVE_REWARD_VALIDATOR = [
    (0, express_validator_1.param)("reqId").isString().notEmpty().withMessage("Please provide the valid request id"),
    validate_1.validate
];
exports.SHOPID_VALIDATOR = [
    (0, express_validator_1.param)("shopId").isString().notEmpty().withMessage("Please provide the valid shop id"),
    validate_1.validate
];
