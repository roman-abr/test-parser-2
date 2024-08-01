"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserService = void 0;
const axios_1 = require("axios");
const jsdom_1 = require("jsdom");
const utils_1 = require("../utils");
const pdf = require("pdfkit");
const promises_1 = require("fs/promises");
const path_1 = require("path");
class ParserService {
    async parseSite(url, res) {
        const words = await this.getWords(url);
        const choosed = (0, utils_1.getMaxTen)(words);
        await this.makePdf(url, choosed, res);
    }
    async makePdf(url, words, res) {
        const doc = new pdf({ lang: 'ru-RU' });
        doc.pipe(res);
        const fontPath = 'misc/Alice-Regular.ttf';
        const a = await (0, promises_1.readFile)((0, path_1.join)(__dirname, '../../', fontPath));
        doc.font(a).fontSize(15);
        for (const word of words) {
            doc.moveDown();
            console.log(word);
            doc.text(word);
        }
        doc.end();
    }
    async getWords(url) {
        console.log(url);
        const response = await axios_1.default.get(url);
        const { window } = new jsdom_1.JSDOM(response.data);
        const document = window.document;
        const xpath = "//*[normalize-space(text()) != '']";
        const result = [];
        const xPathResult = document.evaluate(xpath, document, null, window.XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
        try {
            let thisNode = xPathResult.iterateNext();
            while (thisNode) {
                thisNode.normalize();
                if (!["SCRIPT", "STYLE"].includes(thisNode.nodeName)) {
                    const text = thisNode.textContent;
                    if (text === null || text === void 0 ? void 0 : text.length) {
                        const splited = text.split(' ');
                        result.push(...splited.map(w => w.trim()));
                    }
                }
                thisNode = xPathResult.iterateNext();
            }
        }
        catch (e) {
            console.error(`Error: Document tree modified during iteration ${e}`);
        }
        return (0, utils_1.unique)(result);
    }
}
exports.ParserService = ParserService;
//# sourceMappingURL=parser.service.js.map