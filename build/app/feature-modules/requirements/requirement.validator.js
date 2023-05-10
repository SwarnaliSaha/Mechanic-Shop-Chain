"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APPROVE_REQ_VALIDATOR = exports.VIEW_ALL_REQUESTS = exports.ADD_REQUEST_VALIDATOR = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.ADD_REQUEST_VALIDATOR = [
    (0, express_validator_1.body)("shopId").isString().notEmpty().withMessage("Please provide the valid shop id"),
    (0, express_validator_1.body)("partsRequired.*.itemId").isString().notEmpty().withMessage("Please provide the valid item id"),
    (0, express_validator_1.body)("partsRequired.*.requiredQty").isInt().notEmpty().withMessage("Please provide the required quantity"),
    (0, express_validator_1.body)("isApproved").optional({ nullable: true }).isBoolean().withMessage("boolean value"),
    validate_1.validate
];
exports.VIEW_ALL_REQUESTS = [
    (0, express_validator_1.query)("sort").optional({ nullable: true }).isString().withMessage("must be a string"),
    (0, express_validator_1.query)("page").optional({ nullable: true }).isString().withMessage("must be a string"),
    (0, express_validator_1.query)("limit").optional({ nullable: true }).isString().withMessage("must be a string"),
];
exports.APPROVE_REQ_VALIDATOR = [
    (0, express_validator_1.param)("shopId").isString().notEmpty().withMessage("Please provide the valid shop id"),
    (0, express_validator_1.body)("reqId").isString().notEmpty().withMessage("Please provide the valid request id"),
    validate_1.validate
];
