import { body, param, query } from "express-validator";
import { validate } from "../../utility/validate";

export const USER_RATING_VALIDATION = [
    body("shopId").isString().notEmpty().withMessage("Shop id must not be empty and must be a string"),
    body("rating").isInt().notEmpty().withMessage("Please provide a rating"),
    validate
]

export const GET_ALL_AVG_RATING = [
    query("sort").optional({nullable: true}).isString().withMessage("must be a string"),
    query("page").optional({nullable: true}).isString().withMessage("must be a string"),
    query("limit").optional({nullable: true}).isString().withMessage("must be a string"),
    query("avgRating").optional({nullable: true}).isObject().withMessage("must be a valid query"),
]