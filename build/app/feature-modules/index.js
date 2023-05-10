"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shop_router_1 = __importDefault(require("./shops/shop.router"));
const role_router_1 = __importDefault(require("./roles/role.router"));
const inventory_router_1 = __importDefault(require("./inventory/inventory.router"));
const reward_router_1 = __importDefault(require("./rewards/reward.router"));
const sales_router_1 = __importDefault(require("./sales/sales.router"));
const requirement_router_1 = __importDefault(require("./requirements/requirement.router"));
const reward_router_2 = __importDefault(require("./reward-req/reward.router"));
const user_rating_router_1 = __importDefault(require("./user-rating/user-rating.router"));
const auth_router_1 = __importDefault(require("./auth/auth.router"));
const user_router_1 = __importDefault(require("./users/user.router"));
exports.default = {
    RoleRouter: role_router_1.default,
    ShopRouter: shop_router_1.default,
    InventoryRouter: inventory_router_1.default,
    RewardRouter: reward_router_1.default,
    SalesRouter: sales_router_1.default,
    RequirementRouter: requirement_router_1.default,
    RewardRequest: reward_router_2.default,
    UserratingRouter: user_rating_router_1.default,
    AuthRouter: auth_router_1.default,
    UserRouter: user_router_1.default
};
