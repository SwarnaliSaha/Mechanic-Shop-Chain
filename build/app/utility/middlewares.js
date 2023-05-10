"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcludedPath = exports.validateRole = exports.authorize = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const authorize = (excludedPaths) => {
    return (req, res, next) => {
        var _a;
        try {
            if (excludedPaths.find(e => e.path === req.url && e.methods === req.method)) {
                return next();
            }
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            const PUBLIC_KEY = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "..\\keys\\public.pem"), { encoding: "utf-8" });
            const tokenDecode = (0, jsonwebtoken_1.verify)(token || "", PUBLIC_KEY || "");
            console.log(tokenDecode);
            res.locals.tokenDecode = tokenDecode;
            next();
        }
        catch (e) {
            next(e);
        }
    };
};
exports.authorize = authorize;
const validateRole = (roles) => {
    return (req, res, next) => {
        try {
            const { role } = res.locals.tokenDecode;
            for (let ele of roles) {
                if (ele === role.toString())
                    return next();
            }
            return next({ message: "Unauthorised Access", statusCode: 401 });
        }
        catch (e) {
            next(e);
        }
    };
};
exports.validateRole = validateRole;
class ExcludedPath {
    constructor(path, methods) {
        this.path = path;
        this.methods = methods;
    }
}
exports.ExcludedPath = ExcludedPath;
