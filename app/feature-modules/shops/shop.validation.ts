import { body, param, query } from "express-validator";
import { validate } from "../../utility/validate";

export const CREATE_SHOP_VALIDATION =[
    body("shopName").isString().notEmpty().withMessage("Must not be empty"),
    body("ownerDetails.userName").isString().notEmpty().withMessage("must not be empty"),
    body("ownerDetails.role").optional({nullable:true}).isString().notEmpty().withMessage("your role must not be empty"),
    body("ownerDetails.email").isEmail().notEmpty().withMessage("invalid email"),
    body("ownerDetails.password").isString().notEmpty().isLength({min:3}).withMessage("Must contain atleat 3 characters"),
    body("inventory.*.itemId").notEmpty().withMessage("Item id must not be empty"),
    body("inventory.*.qty").isInt().notEmpty().isLength({min:3}).withMessage("Item qty must not be empty and must be a number"),
    body("inventory.*.status").isBoolean().withMessage("status must not be empty"),
    body("points").optional({nullable: true}).isInt(),
    body("pendingPoints").optional({nullable: true}).isInt(),
    body("revenue").optional({nullable: true}).isInt(),
    body("transactionApprovalStatus").optional({nullable: true}).isBoolean(),
    body("redeemedGifts").optional({nullable: true}).isArray(),
    body("rating").optional({nullable: true}).isInt(),
    
    validate
]

export const VIEW_ALL_SHOPS = [
    query("sort").optional({nullable: true}).isString().withMessage("must be a string"),
    query("page").optional({nullable: true}).isString().withMessage("must be a string"),
    query("limit").optional({nullable: true}).isString().withMessage("must be a string"),
    query("shopId").optional({nullable: true}).isString().withMessage("must be a valid shopId"),
    query("shopName").optional({nullable: true}).isString().withMessage("must be a valid shopName"),
    query("points").optional({nullable: true}).isObject().withMessage("must be a valid point"),
    query("revenue").optional({nullable: true}).isObject().withMessage("must be a valid revenue"),
    query("rating").optional({nullable: true}).isObject().withMessage("must be a valid rating"),
    validate
]

export const SHOP_ID_VALIDATOR = [
    param("id").isString().notEmpty().withMessage("Must be string and must not be empty"),
    validate
]

export const UPDATE_SHOP_VALIDATOR = [
    param("id").isString().notEmpty().withMessage("Must be string and must not be empty"),
    body("shopName").optional({nullable:true}).isString().notEmpty().withMessage("Must not be empty"),
    body("ownerDetails.userName").optional({nullable:true}).isString().notEmpty().withMessage("must not be empty"),
    body("ownerDetails.role").optional({nullable:true}).optional({nullable:true}).isString().notEmpty().withMessage("your role must not be empty"),
    body("ownerDetails.email").optional({nullable:true}).isEmail().notEmpty().withMessage("invalid email"),
    body("ownerDetails.password").optional({nullable:true}).isString().notEmpty().isLength({min:3}).withMessage("Must contain atleat 3 characters"),
    body("inventory.*.itemId").optional({nullable:true}).notEmpty().withMessage("Item id must not be empty"),
    body("inventory.*.qty").optional({nullable:true}).isInt().notEmpty().isLength({min:3}).withMessage("Item qty must not be empty and must be a number"),
    body("inventory.*.status").optional({nullable:true}).isBoolean().withMessage("status must not be empty"),
    body("points").optional({nullable: true}).isInt(),
    body("pendingPoints").optional({nullable: true}).isInt(),
    body("revenue").optional({nullable: true}).isInt(),
    body("transactionApprovalStatus").optional({nullable: true}).isBoolean(),
    body("redeemedGifts").optional({nullable: true}).isArray(),
    body("rating").optional({nullable: true}).isInt(),
    
    validate
]

export const TRANSACTION_APPROVAL_VALIDATOR = [
    param("shopId").isString().notEmpty().withMessage("Must be string and must not be empty"),
    body("status").isBoolean().notEmpty().withMessage("must be a boolean value and must not be empty"),
    validate
]

export const VALIDATOR_FOR_OWNER = [
    param("shopId").isString().notEmpty().withMessage("Must be string and must not be empty"),
    validate
]