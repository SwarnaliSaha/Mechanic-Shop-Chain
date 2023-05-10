"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHOPID_VALIDATOR = exports.VIEW_REWARD_VALIDATOR = exports.VALIDATE_PAGE_NUMBER = exports.DELETE_REWARD_VALIDATAOR = exports.UPDATE_REWARD_VALIDATOR = exports.ADD_REWARD_VALIDATOR = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.ADD_REWARD_VALIDATOR = [
    (0, express_validator_1.body)("rewardName").isString().notEmpty().withMessage("reward name must be a string and must not be empty"),
    (0, express_validator_1.body)("rewardPoints").isInt().notEmpty().withMessage("reward name must be a number and must not be empty"),
    validate_1.validate
];
exports.UPDATE_REWARD_VALIDATOR = [
    (0, express_validator_1.param)("id").isString().notEmpty().withMessage("reward-id must be a string and must not be empty"),
    (0, express_validator_1.body)("rewardName").optional({ nullable: true }).isString().withMessage("reward name must be a string and must not be empty"),
    (0, express_validator_1.body)("rewardPoints").optional({ nullable: true }).isInt().notEmpty().withMessage("reward points must be a number and must not be empty"),
    validate_1.validate
];
exports.DELETE_REWARD_VALIDATAOR = [
    (0, express_validator_1.param)("id").isString().notEmpty().withMessage("reward-id must be a string and must not be empty"),
    validate_1.validate
];
exports.VALIDATE_PAGE_NUMBER = [
    (0, express_validator_1.param)("pageNumber").isString().notEmpty().withMessage("Please provide he page number"),
    validate_1.validate
];
exports.VIEW_REWARD_VALIDATOR = [
    (0, express_validator_1.query)("sort").optional({ nullable: true }).isString().withMessage("must be a string"),
    (0, express_validator_1.query)("page").optional({ nullable: true }).isString().withMessage("must be a string"),
    (0, express_validator_1.query)("limit").optional({ nullable: true }).isString().withMessage("must be a string"),
    (0, express_validator_1.query)("rewardName").optional({ nullable: true }).isString().withMessage("must be a valid reward name"),
    (0, express_validator_1.query)("rewardPoints").optional({ nullable: true }).isString().withMessage("must be a valid reward reward point"),
    validate_1.validate
];
exports.SHOPID_VALIDATOR = [
    (0, express_validator_1.param)("shopId").isString().notEmpty().withMessage("Please provide the valid shop id"),
    validate_1.validate
];
