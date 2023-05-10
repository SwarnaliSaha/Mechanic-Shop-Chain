import { body, param, query } from "express-validator";
import { validate } from "../../utility/validate";

export const UPDATE_OWNER_VALIDATION = [
    param("userId").isString().notEmpty().withMessage("Must be string and must not be empty"),
    body("userName").optional({nullable:true}).isString().notEmpty().withMessage("Must be string and must not be empty"),
    body("email").optional({nullable:true}).isEmail().notEmpty().withMessage("Must be string and must not be empty"),
    body("password").optional({nullable:true}).isString().notEmpty().isLength({min:3}).withMessage("Must be string and must not be empty"),

    validate
]

export const OWNER_ID_VALIDATOR = [
    param("userId").isString().notEmpty().withMessage("Must be string and must not be empty"),

    validate
]

export const VIEW_ALL_OWNER = [
    query("sort").optional({nullable: true}).isString().withMessage("must be a string"),
    query("page").optional({nullable: true}).isString().withMessage("must be a string"),
    query("limit").optional({nullable: true}).isString().withMessage("must be a string"),
    query("userName").optional({nullable: true}).isString().withMessage("must be a valid userName"),
    query("email").optional({nullable: true}).isEmail().withMessage("must be a valid email"),

    validate
]