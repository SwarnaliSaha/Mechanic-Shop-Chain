import { body, param, query } from "express-validator";
import { validate } from "../../utility/validate";

export const ADD_REWARD_VALIDATOR = [
    body("rewardName").isString().notEmpty().withMessage("reward name must be a string and must not be empty"),
    body("rewardPoints").isInt().notEmpty().withMessage("reward name must be a number and must not be empty"),
    validate
]

export const UPDATE_REWARD_VALIDATOR = [
    param("id").isString().notEmpty().withMessage("reward-id must be a string and must not be empty"),
    body("rewardName").optional({nullable: true}).isString().withMessage("reward name must be a string and must not be empty"),
    body("rewardPoints").optional({nullable: true}).isInt().notEmpty().withMessage("reward points must be a number and must not be empty"),
    validate
]

export const DELETE_REWARD_VALIDATAOR = [
    param("id").isString().notEmpty().withMessage("reward-id must be a string and must not be empty"),
    validate
]

export const VALIDATE_PAGE_NUMBER = [
    param("pageNumber").isString().notEmpty().withMessage("Please provide he page number"),
    validate
]

export const VIEW_REWARD_VALIDATOR = [
    query("sort").optional({nullable: true}).isString().withMessage("must be a string"),
    query("page").optional({nullable: true}).isString().withMessage("must be a string"),
    query("limit").optional({nullable: true}).isString().withMessage("must be a string"),
    query("rewardName").optional({nullable: true}).isString().withMessage("must be a valid reward name"),
    query("rewardPoints").optional({nullable: true}).isString().withMessage("must be a valid reward reward point"),

    validate
]

export const SHOPID_VALIDATOR = [
    param("shopId").isString().notEmpty().withMessage("Please provide the valid shop id"),

    validate
]