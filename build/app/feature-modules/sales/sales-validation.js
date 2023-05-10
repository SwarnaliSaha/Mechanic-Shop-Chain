"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ITEM_WISE_SELLER_VALIDATOR = exports.DELETE_BILL_VALIDATOR = exports.VIEW_BILL_VALIDATOR = exports.GENERATE_BILL_VALIDATOR = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.GENERATE_BILL_VALIDATOR = [
    (0, express_validator_1.body)("customerName").isString().notEmpty().withMessage("Please provide a valid customer name"),
    (0, express_validator_1.body)("customerEmail").isEmail().notEmpty().withMessage("Please provide a valid mail id"),
    (0, express_validator_1.body)("shopId").isString().notEmpty().withMessage("Must provide your shop id"),
    (0, express_validator_1.body)("itemsPurchased.*.itemName").isString().notEmpty().withMessage("Please provide a valid item name"),
    (0, express_validator_1.body)("itemsPurchased.*.itemId").isString().notEmpty().withMessage("Please provide a valid item-id"),
    (0, express_validator_1.body)("itemsPurchased.*.soldQty").isInt().notEmpty().withMessage("Please enter the valid sold qty"),
    (0, express_validator_1.body)("itemsPurchased.*.subTotal").optional({ nullable: true }).isInt().withMessage("sub total must be a number"),
    (0, express_validator_1.body)("grandTotal").optional({ nullable: true }).isInt().withMessage("grand total must be a number"),
    validate_1.validate
];
exports.VIEW_BILL_VALIDATOR = [
    (0, express_validator_1.query)("sort").optional({ nullable: true }).isString().withMessage("must be a string"),
    (0, express_validator_1.query)("page").optional({ nullable: true }).isString().withMessage("must be a string"),
    (0, express_validator_1.query)("limit").optional({ nullable: true }).isString().withMessage("must be a string"),
    (0, express_validator_1.query)("shopId").optional({ nullable: true }).isString().withMessage("must be a valid shopId"),
    (0, express_validator_1.query)("startDate").optional({ nullable: true }).isString().withMessage("must be a valid date"),
    (0, express_validator_1.query)("endDate").optional({ nullable: true }).isString().withMessage("must be a valid date"),
    validate_1.validate
];
exports.DELETE_BILL_VALIDATOR = [
    (0, express_validator_1.param)("reqId").isString().withMessage("Must be a valid request Id"),
    validate_1.validate
];
exports.ITEM_WISE_SELLER_VALIDATOR = [
    (0, express_validator_1.query)("sort").optional({ nullable: true }).isString().withMessage("must be a string"),
    (0, express_validator_1.query)("page").optional({ nullable: true }).isString().withMessage("must be a string"),
    (0, express_validator_1.query)("limit").optional({ nullable: true }).isString().withMessage("must be a string"),
    validate_1.validate
];
