"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludedPaths = exports.routes = void 0;
const route_type_1 = require("./route.type");
const index_1 = __importDefault(require("../feature-modules/index"));
const middlewares_1 = require("../utility/middlewares");
exports.routes = [
    new route_type_1.Route("/roles", index_1.default.RoleRouter),
    new route_type_1.Route("/shops", index_1.default.ShopRouter),
    new route_type_1.Route('/inventory', index_1.default.InventoryRouter),
    new route_type_1.Route('/rewards', index_1.default.RewardRouter),
    new route_type_1.Route('/sales', index_1.default.SalesRouter),
    new route_type_1.Route('/requirements', index_1.default.RequirementRouter),
    new route_type_1.Route('/RewardRequest', index_1.default.RewardRequest),
    new route_type_1.Route('/userRating', index_1.default.UserratingRouter),
    new route_type_1.Route('/auth', index_1.default.AuthRouter),
    new route_type_1.Route('/users', index_1.default.UserRouter)
];
exports.excludedPaths = [
    new middlewares_1.ExcludedPath("/auth/login", "POST"),
    new middlewares_1.ExcludedPath("/auth/refresh", "POST"),
    new middlewares_1.ExcludedPath("/userRating", "POST"),
];
