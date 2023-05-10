import { body, param, query } from "express-validator";
import { validate } from "../../utility/validate";

export const ADD_ITEM_VALIDATOR = [
    body("itemName").isString().notEmpty().withMessage("product name must be a string and must not be empty"),
    body("minLimit").isInt().notEmpty().withMessage("Must specify a min-limit of integer type"),
    body("price").isInt().notEmpty().withMessage("The product must have a price of number type"),
    body("isSpecial").optional({nullable: true}).isBoolean().withMessage("Must be a boolean value"),
    body("points").optional({nullable: true}).isInt().notEmpty().withMessage("please specify the points if the product is special"),
    validate
]

export const UPDATE_ITEM_VALIDATOR = [
    param("id").isString().notEmpty().withMessage("Must provide a valid shop id"),
    body("itemName").optional({nullable: true}).isString().notEmpty().withMessage("product name must be a string and must not be empty"),
    body("minLimit").optional({nullable: true}).isInt().notEmpty().withMessage("Must specify a min-limit of integer type"),
    body("price").optional({nullable: true}).isInt().notEmpty().withMessage("The product must have a price of number type"),
    body("isSpecial").optional({nullable: true}).isBoolean().withMessage("Must be a boolean value"),
    body("points").optional({nullable: true}).isInt().notEmpty().withMessage("please specify the points if the product is special"),
    validate
]

export const DELETE_ITEM_VALIDATOR = [
    param("id").isString().notEmpty().withMessage("Must provide a valid shop id"),
    validate
]

export const VIEW_PRODUCT_VALIDATOR = [
    query("sort").optional({nullable: true}).isString().withMessage("must be a string"),
    query("page").optional({nullable: true}).isString().withMessage("must be a string"),
    query("limit").optional({nullable: true}).isString().withMessage("must be a string"),
    query("itemName").optional({nullable: true}).isString().withMessage("item-name must be a string"),
    query("price").optional({nullable: true}).isObject().withMessage("price must be valid"),
    query("minLimit").optional({nullable: true}).isObject().withMessage("min-limit must be valid"),

    validate
]