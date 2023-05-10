"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALIDATOR_FOR_OWNER = exports.TRANSACTION_APPROVAL_VALIDATOR = exports.UPDATE_SHOP_VALIDATOR = exports.SHOP_ID_VALIDATOR = exports.VIEW_ALL_SHOPS = exports.CREATE_SHOP_VALIDATION = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.CREATE_SHOP_VALIDATION = [
    (0, express_validator_1.body)("shopName").isString().notEmpty().withMessage("Must not be empty"),
    (0, express_validator_1.body)("ownerDetails.userName").isString().notEmpty().withMessage("must not be empty"),
    (0, express_validator_1.body)("ownerDetails.role").optional({ nullable: true }).isString().notEmpty().withMessage("your role must not be empty"),
    (0, express_validator_1.body)("ownerDetails.email").isEmail().notEmpty().withMessage("invalid email"),
    (0, express_validator_1.body)("ownerDetails.password").isString().notEmpty().isLength({ min: 3 }).withMessage("Must contain atleat 3 characters"),
    (0, express_validator_1.body)("inventory.*.itemId").notEmpty().withMessage("Item id must not be empty"),
    (0, express_validator_1.body)("inventory.*.qty").isInt().notEmpty().isLength({ min: 3 }).withMessage("Item qty must not be empty and must be a number"),
    (0, express_validator_1.body)("inventory.*.status").isBoolean().withMessage("status must not be empty"),
    (0, express_validator_1.body)("points").optional({ nullable: true }).isInt(),
    (0, express_validator_1.body)("pendingPoints").optional({ nullable: true }).isInt(),
    (0, express_validator_1.body)("revenue").optional({ nullable: true }).isInt(),
    (0, express_validator_1.body)("transactionApprovalStatus").optional({ nullable: true }).isBoolean(),
    (0, express_validator_1.body)("redeemedGifts").optional({ nullable: true }).isArray(),
    (0, express_validator_1.body)("rating").optional({ nullable: true }).isInt(),
    validate_1.validate
];
exports.VIEW_ALL_SHOPS = [
    (0, express_validator_1.query)("sort").optional({ nullable: true }).isString().withMessage("must be a string"),
    (0, express_validator_1.query)("page").optional({ nullable: true }).isString().withMessage("must be a string"),
    (0, express_validator_1.query)("limit").optional({ nullable: true }).isString().withMessage("must be a string"),
    (0, express_validator_1.query)("shopId").optional({ nullable: true }).isString().withMessage("must be a valid shopId"),
    (0, express_validator_1.query)("shopName").optional({ nullable: true }).isString().withMessage("must be a valid shopName"),
    (0, express_validator_1.query)("points").optional({ nullable: true }).isObject().withMessage("must be a valid point"),
    (0, express_validator_1.query)("revenue").optional({ nullable: true }).isObject().withMessage("must be a valid revenue"),
    (0, express_validator_1.query)("rating").optional({ nullable: true }).isObject().withMessage("must be a valid rating"),
    validate_1.validate
];
exports.SHOP_ID_VALIDATOR = [
    (0, express_validator_1.param)("id").isString().notEmpty().withMessage("Must be string and must not be empty"),
    validate_1.validate
];
exports.UPDATE_SHOP_VALIDATOR = [
    (0, express_validator_1.param)("id").isString().notEmpty().withMessage("Must be string and must not be empty"),
    (0, express_validator_1.body)("shopName").optional({ nullable: true }).isString().notEmpty().withMessage("Must not be empty"),
    (0, express_validator_1.body)("ownerDetails.userName").optional({ nullable: true }).isString().notEmpty().withMessage("must not be empty"),
    (0, express_validator_1.body)("ownerDetails.role").optional({ nullable: true }).optional({ nullable: true }).isString().notEmpty().withMessage("your role must not be empty"),
    (0, express_validator_1.body)("ownerDetails.email").optional({ nullable: true }).isEmail().notEmpty().withMessage("invalid email"),
    (0, express_validator_1.body)("ownerDetails.password").optional({ nullable: true }).isString().notEmpty().isLength({ min: 3 }).withMessage("Must contain atleat 3 characters"),
    (0, express_validator_1.body)("inventory.*.itemId").optional({ nullable: true }).notEmpty().withMessage("Item id must not be empty"),
    (0, express_validator_1.body)("inventory.*.qty").optional({ nullable: true }).isInt().notEmpty().isLength({ min: 3 }).withMessage("Item qty must not be empty and must be a number"),
    (0, express_validator_1.body)("inventory.*.status").optional({ nullable: true }).isBoolean().withMessage("status must not be empty"),
    (0, express_validator_1.body)("points").optional({ nullable: true }).isInt(),
    (0, express_validator_1.body)("pendingPoints").optional({ nullable: true }).isInt(),
    (0, express_validator_1.body)("revenue").optional({ nullable: true }).isInt(),
    (0, express_validator_1.body)("transactionApprovalStatus").optional({ nullable: true }).isBoolean(),
    (0, express_validator_1.body)("redeemedGifts").optional({ nullable: true }).isArray(),
    (0, express_validator_1.body)("rating").optional({ nullable: true }).isInt(),
    validate_1.validate
];
exports.TRANSACTION_APPROVAL_VALIDATOR = [
    (0, express_validator_1.param)("shopId").isString().notEmpty().withMessage("Must be string and must not be empty"),
    (0, express_validator_1.body)("status").isBoolean().notEmpty().withMessage("must be a boolean value and must not be empty"),
    validate_1.validate
];
exports.VALIDATOR_FOR_OWNER = [
    (0, express_validator_1.param)("shopId").isString().notEmpty().withMessage("Must be string and must not be empty"),
    validate_1.validate
];
