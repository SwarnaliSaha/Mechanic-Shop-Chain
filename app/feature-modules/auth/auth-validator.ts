import { body, param } from "express-validator";
import { validate } from "../../utility/validate";

export const LOGIN_VALIDATOR = [
    body("email").isEmail().notEmpty().withMessage("Provide a valid email id"),
    body("password").isString().notEmpty().isLength({min:3}).withMessage("Must contain atleat 3 characters"),
    validate
]

export const REFRESH_TOKEN_VALIDATOR = [
    body("refreshToken").isString().notEmpty().withMessage("Please provide the refresh token to get a new access token"),

    validate
]