import { body, param, query } from "express-validator";
import { validate } from "../../utility/validate";

export const ADD_REQUEST_VALIDATOR = [
    body("shopId").isString().notEmpty().withMessage("Please provide the valid shop id"),
    body("partsRequired.*.itemId").isString().notEmpty().withMessage("Please provide the valid item id"),
    body("partsRequired.*.requiredQty").isInt().notEmpty().withMessage("Please provide the required quantity"),
    body("isApproved").optional({nullable: true}).isBoolean().withMessage("boolean value"),
    validate
]

export const VIEW_ALL_REQUESTS = [
    query("sort").optional({nullable: true}).isString().withMessage("must be a string"),
    query("page").optional({nullable: true}).isString().withMessage("must be a string"),
    query("limit").optional({nullable: true}).isString().withMessage("must be a string"),
]

export const APPROVE_REQ_VALIDATOR = [
    param("shopId").isString().notEmpty().withMessage("Please provide the valid shop id"),
    body("reqId").isString().notEmpty().withMessage("Please provide the valid request id"),
    validate
]