"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaxTen = exports.validateUrl = exports.unique = void 0;
const unique = (arr) => Array.from(new Set(arr));
exports.unique = unique;
const validateUrl = (url) => {
    try {
        new URL(url);
        return url;
    }
    catch (e) {
        throw new Error('Invalid url');
    }
};
exports.validateUrl = validateUrl;
const getMaxTen = (arr) => arr.sort((a, b) => b.length - a.length).slice(0, 10);
exports.getMaxTen = getMaxTen;
//# sourceMappingURL=utils.js.map