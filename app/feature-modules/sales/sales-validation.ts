import { body, param, query } from "express-validator";
import { validate } from "../../utility/validate";

export const GENERATE_BILL_VALIDATOR = [
    body("customerName").isString().notEmpty().withMessage("Please provide a valid customer name"),
    body("customerEmail").isEmail().notEmpty().withMessage("Please provide a valid mail id"),
    body("shopId").isString().notEmpty().withMessage("Must provide your shop id"),
    body("itemsPurchased.*.itemName").isString().notEmpty().withMessage("Please provide a valid item name"),
    body("itemsPurchased.*.itemId").isString().notEmpty().withMessage("Please provide a valid item-id"),
    body("itemsPurchased.*.soldQty").isInt().notEmpty().withMessage("Please enter the valid sold qty"),
    body("itemsPurchased.*.subTotal").optional({nullable: true}).isInt().withMessage("sub total must be a number"),
    body("grandTotal").optional({nullable: true}).isInt().withMessage("grand total must be a number"),
    validate
]

export const VIEW_BILL_VALIDATOR = [
    query("sort").optional({nullable: true}).isString().withMessage("must be a string"),
    query("page").optional({nullable: true}).isString().withMessage("must be a string"),
    query("limit").optional({nullable: true}).isString().withMessage("must be a string"),
    query("shopId").optional({nullable: true}).isString().withMessage("must be a valid shopId"),
    query("startDate").optional({nullable: true}).isString().withMessage("must be a valid date"),
    query("endDate").optional({nullable: true}).isString().withMessage("must be a valid date"),

    validate
]

export const DELETE_BILL_VALIDATOR = [
    param("reqId").isString().withMessage("Must be a valid request Id"),

    validate
]

export const ITEM_WISE_SELLER_VALIDATOR = [
    query("sort").optional({nullable: true}).isString().withMessage("must be a string"),
    query("page").optional({nullable: true}).isString().withMessage("must be a string"),
    query("limit").optional({nullable: true}).isString().withMessage("must be a string"),

    validate
]