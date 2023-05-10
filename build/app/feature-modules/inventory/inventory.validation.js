"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VIEW_PRODUCT_VALIDATOR = exports.DELETE_ITEM_VALIDATOR = exports.UPDATE_ITEM_VALIDATOR = exports.ADD_ITEM_VALIDATOR = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.ADD_ITEM_VALIDATOR = [
    (0, express_validator_1.body)("itemName").isString().notEmpty().withMessage("product name must be a string and must not be empty"),
    (0, express_validator_1.body)("minLimit").isInt().notEmpty().withMessage("Must specify a min-limit of integer type"),
    (0, express_validator_1.body)("price").isInt().notEmpty().withMessage("The product must have a price of number type"),
    (0, express_validator_1.body)("isSpecial").optional({ nullable: true }).isBoolean().withMessage("Must be a boolean value"),
    (0, express_validator_1.body)("points").optional({ nullable: true }).isInt().notEmpty().withMessage("please specify the points if the product is special"),
    validate_1.validate
];
exports.UPDATE_ITEM_VALIDATOR = [
    (0, express_validator_1.param)("id").isString().notEmpty().withMessage("Must provide a valid shop id"),
    (0, express_validator_1.body)("itemName").optional({ nullable: true }).isString().notEmpty().withMessage("product name must be a string and must not be empty"),
    (0, express_validator_1.body)("minLimit").optional({ nullable: true }).isInt().notEmpty().withMessage("Must specify a min-limit of integer type"),
    (0, express_validator_1.body)("price").optional({ nullable: true }).isInt().notEmpty().withMessage("The product must have a price of number type"),
    (0, express_validator_1.body)("isSpecial").optional({ nullable: true }).isBoolean().withMessage("Must be a boolean value"),
    (0, express_validator_1.body)("points").optional({ nullable: true }).isInt().notEmpty().withMessage("please specify the points if the product is special"),
    validate_1.validate
];
exports.DELETE_ITEM_VALIDATOR = [
    (0, express_validator_1.param)("id").isString().notEmpty().withMessage("Must provide a valid shop id"),
    validate_1.validate
];
exports.VIEW_PRODUCT_VALIDATOR = [
    (0, express_validator_1.query)("sort").optional({ nullable: true }).isString().withMessage("must be a string"),
    (0, express_validator_1.query)("page").optional({ nullable: true }).isString().withMessage("must be a string"),
    (0, express_validator_1.query)("limit").optional({ nullable: true }).isString().withMessage("must be a string"),
    (0, express_validator_1.query)("itemName").optional({ nullable: true }).isString().withMessage("item-name must be a string"),
    (0, express_validator_1.query)("price").optional({ nullable: true }).isObject().withMessage("price must be valid"),
    (0, express_validator_1.query)("minLimit").optional({ nullable: true }).isObject().withMessage("min-limit must be valid"),
    validate_1.validate
];
