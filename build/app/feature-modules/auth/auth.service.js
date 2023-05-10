"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../users/user.service"));
const auth_response_1 = require("./auth-response");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const encryptedPassword = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield (0, bcryptjs_1.genSalt)(10);
    const hashedPassword = yield (0, bcryptjs_1.hash)(user.password, salt);
    user.password = hashedPassword;
    return user;
});
const login = (cred) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(1);
    const user = yield user_service_1.default.findOne({ email: cred.email });
    if (!user)
        throw auth_response_1.AUTH_RESPONSES.INVALID_USER_CREDENTIALS;
    console.log(2);
    const isPasswordValid = yield (0, bcryptjs_1.compare)(cred.password, user.password);
    console.log(isPasswordValid);
    console.log(cred.password);
    console.log(user.password);
    if (!isPasswordValid)
        throw auth_response_1.AUTH_RESPONSES.INVALID_USER_CREDENTIALS;
    const PRIVATE_KEY = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "..\\..\\keys\\private.pem"), { encoding: "utf-8" });
    const { _id, role } = user;
    try {
        const token = jsonwebtoken_1.default.sign({ id: _id, role: role }, PRIVATE_KEY || "", { algorithm: 'RS256', expiresIn: '900s' });
        const refreshToken = jsonwebtoken_1.default.sign({ id: _id, role: role }, PRIVATE_KEY || "", { algorithm: 'RS256', expiresIn: '9000s' });
        return { token, refreshToken };
    }
    catch (error) {
        console.log(error);
    }
});
const refreshToken = (token) => {
    const PUBLIC_KEY = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "..\\..\\keys\\public.pem"), { encoding: "utf-8" });
    const tokenDecode = (0, jsonwebtoken_1.verify)(token || "", PUBLIC_KEY || "");
    console.log(tokenDecode);
    const PRIVATE_KEY = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "..\\..\\keys\\private.pem"), { encoding: "utf-8" });
    if (tokenDecode) {
        const accessToken = jsonwebtoken_1.default.sign({ id: tokenDecode.id, role: tokenDecode.role }, PRIVATE_KEY || "", { algorithm: 'RS256', expiresIn: '900s' });
        return { accessToken };
    }
    else {
        throw { statusCode: 400, message: "Token invalid" };
    }
};
exports.default = {
    login,
    refreshToken
};
