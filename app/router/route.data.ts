import { Route,Routes } from "./route.type"
import Routers from "../feature-modules/index"
import { ExcludedPath, ExcludedPaths } from "../utility/middlewares";

export const routes : Routes =[
    new Route("/roles",Routers.RoleRouter),
    new Route("/shops",Routers.ShopRouter),
    new Route('/inventory',Routers.InventoryRouter),
    new Route('/rewards',Routers.RewardRouter),
    new Route('/sales',Routers.SalesRouter),
    new Route('/requirements',Routers.RequirementRouter),
    new Route('/RewardRequest',Routers.RewardRequest),
    new Route('/userRating',Routers.UserratingRouter),
    new Route('/auth',Routers.AuthRouter),
    new Route('/users',Routers.UserRouter)
];

export const excludedPaths: ExcludedPaths = [
    new ExcludedPath("/auth/login", "POST"),
    new ExcludedPath("/auth/refresh", "POST"),
    new ExcludedPath("/userRating","POST"),
];
