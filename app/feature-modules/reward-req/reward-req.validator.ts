import { body, param, query } from "express-validator";
import { validate } from "../../utility/validate";

export const REWARD_REQUEST_VALIDATOR = [
    body("shopId").isString().notEmpty().withMessage("Please provide the valid shop id"),
    body("reward").isString().notEmpty().withMessage("Please provide the name of the reward"),
    validate
]

export const VIEW_ALL_REDEEM_REQUESTS_VALIDATOR = [
    query("sort").optional({nullable: true}).isString().withMessage("must be a string"),
    query("page").optional({nullable: true}).isString().withMessage("must be a string"),
    query("limit").optional({nullable: true}).isString().withMessage("must be a string"),
    query("reward").optional({nullable: true}).isString().withMessage("must be a valid reward name"),

    validate
]

export const APPROVE_REWARD_VALIDATOR = [
    param("reqId").isString().notEmpty().withMessage("Please provide the valid request id"),
    validate
]

export const SHOPID_VALIDATOR = [
    param("shopId").isString().notEmpty().withMessage("Please provide the valid shop id"),

    validate
]