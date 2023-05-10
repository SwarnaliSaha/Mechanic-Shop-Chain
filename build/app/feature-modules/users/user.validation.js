"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VIEW_ALL_OWNER = exports.OWNER_ID_VALIDATOR = exports.UPDATE_OWNER_VALIDATION = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.UPDATE_OWNER_VALIDATION = [
    (0, express_validator_1.param)("userId").isString().notEmpty().withMessage("Must be string and must not be empty"),
    (0, express_validator_1.body)("userName").optional({ nullable: true }).isString().notEmpty().withMessage("Must be string and must not be empty"),
    (0, express_validator_1.body)("email").optional({ nullable: true }).isEmail().notEmpty().withMessage("Must be string and must not be empty"),
    (0, express_validator_1.body)("password").optional({ nullable: true }).isString().notEmpty().isLength({ min: 3 }).withMessage("Must be string and must not be empty"),
    validate_1.validate
];
exports.OWNER_ID_VALIDATOR = [
    (0, express_validator_1.param)("userId").isString().notEmpty().withMessage("Must be string and must not be empty"),
    validate_1.validate
];
exports.VIEW_ALL_OWNER = [
    (0, express_validator_1.query)("sort").optional({ nullable: true }).isString().withMessage("must be a string"),
    (0, express_validator_1.query)("page").optional({ nullable: true }).isString().withMessage("must be a string"),
    (0, express_validator_1.query)("limit").optional({ nullable: true }).isString().withMessage("must be a string"),
    (0, express_validator_1.query)("userName").optional({ nullable: true }).isString().withMessage("must be a valid userName"),
    (0, express_validator_1.query)("email").optional({ nullable: true }).isEmail().withMessage("must be a valid email"),
    validate_1.validate
];
