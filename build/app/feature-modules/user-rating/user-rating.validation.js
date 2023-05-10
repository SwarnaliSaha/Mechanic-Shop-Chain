"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_ALL_AVG_RATING = exports.USER_RATING_VALIDATION = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.USER_RATING_VALIDATION = [
    (0, express_validator_1.body)("shopId").isString().notEmpty().withMessage("Shop id must not be empty and must be a string"),
    (0, express_validator_1.body)("rating").isInt().notEmpty().withMessage("Please provide a rating"),
    validate_1.validate
];
exports.GET_ALL_AVG_RATING = [
    (0, express_validator_1.query)("sort").optional({ nullable: true }).isString().withMessage("must be a string"),
    (0, express_validator_1.query)("page").optional({ nullable: true }).isString().withMessage("must be a string"),
    (0, express_validator_1.query)("limit").optional({ nullable: true }).isString().withMessage("must be a string"),
    (0, express_validator_1.query)("avgRating").optional({ nullable: true }).isObject().withMessage("must be a valid query"),
];
