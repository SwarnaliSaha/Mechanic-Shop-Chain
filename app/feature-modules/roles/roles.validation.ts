import { body, param } from "express-validator";
import { validate } from "../../utility/validate";

export const REGISTER_ROLE_VALIDATION = [
    body("name").isString().notEmpty().withMessage("Provide a valid role name"),
    validate
]

export const DELETE_ROLE_VALIDATION = [
    param("roleId").isString().notEmpty().withMessage("Provide a valid role id"),
    validate
]