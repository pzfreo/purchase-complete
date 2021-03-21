"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = require("express");
const body_parser_1 = require("body-parser");
const routes_1 = require("../build/routes");
exports.app = express_1.default();
// Use body parser to read sent json payloads
exports.app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
exports.app.use(body_parser_1.default.json());
routes_1.RegisterRoutes(exports.app);
const port = process.env.PORT || 8000;
exports.app.listen(port, () => console.log(`Purchase app listening at http://localhost:${port}`));
