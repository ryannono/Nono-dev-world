"use strict";
//---------------Hash funtion Type------------//
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultHashFunction = void 0;
//-------------Default Hash funtion------------//
function defaultHashFunction(key, tableMaxSize) {
    return key % tableMaxSize;
}
exports.defaultHashFunction = defaultHashFunction;
//# sourceMappingURL=hashFunction.js.map