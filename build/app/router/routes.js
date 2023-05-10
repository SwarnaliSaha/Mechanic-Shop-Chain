"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const middlewares_1 = require("../utility/middlewares");
const response_handler_1 = require("../utility/response-handler");
const route_data_1 = require("./route.data");
const express_1 = require("express");
const registerRoutes = (app) => {
    app.use((0, express_1.json)());
    app.use((0, middlewares_1.authorize)(route_data_1.excludedPaths));
    for (let route of route_data_1.routes) {
        app.use(route.path, route.router);
    }
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send(new response_handler_1.ResponseHandler(null, err));
    });
};
exports.registerRoutes = registerRoutes;
