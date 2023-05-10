"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePipeline = void 0;
const generatePipeline = (query) => {
    let pipeline = [];
    const { sort, limit = 10, sortDir, page = 1 } = query, filter = __rest(query, ["sort", "limit", "sortDir", "page"]);
    for (let field in filter) {
        if (Array.isArray(field[filter])) {
            const stage = {
                $match: {
                    field: {
                        $in: filter[field]
                    }
                }
            };
            pipeline.push(stage);
        }
        else if (typeof filter[field] === 'object') {
            const stage = {};
            for (let [key, value] of Object.entries(filter[field])) {
                stage[`$${key}`] = Number(value);
            }
            pipeline.push({ $match: {
                    [field]: stage
                }
            });
        }
        else {
            pipeline.push({
                $match: {
                    [field]: filter[field]
                }
            });
        }
    }
    const sortObject = {};
    if (sort) {
        sortObject[sort] = sortDir == (1 || 'asc') ? 1 : -1;
        pipeline.push({ $sort: sortObject });
    }
    if (limit && page) {
        pipeline.push({
            $skip: (Number(page - 1)) * limit
        });
        pipeline.push({
            $limit: Number(limit)
        });
    }
    console.log(pipeline);
    return pipeline;
};
exports.generatePipeline = generatePipeline;
