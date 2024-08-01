"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const parser_controller_1 = require("./controllers/parser.controller");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/parse', parser_controller_1.ParseController);
//# sourceMappingURL=routes.js.map