"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseController = void 0;
const parser_service_1 = require("../services/parser.service");
const utils_1 = require("../utils");
const ParseController = async (req, res) => {
    const url = (0, utils_1.validateUrl)(req.query['url']);
    const service = new parser_service_1.ParserService();
    res.setHeader('Content-type', 'application/pdf');
    res.setHeader('Access-Control-Allow-Origin', '*');
    await service.parseSite(url, res);
};
exports.ParseController = ParseController;
//# sourceMappingURL=parser.controller.js.map