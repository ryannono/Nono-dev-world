"use strict";
// ---------------- Linked list ---------------- //
Object.defineProperty(exports, "__esModule", { value: true });
exports.llStack = void 0;
const linkedList_1 = require("./linkedList");
// ------------------- Stack ------------------- //
/**
 * "The llStack class is a wrapper around a linked list that implements the stack data structure."
 *
 * The llStack class has a private data property that is a linked list. The constructor takes an
 * optional linked list parameter. If the parameter is not provided, the data property is initialized
 * to a new linked list
 */
class llStack {
    constructor(data) {
        this.data = data !== null && data !== void 0 ? data : new linkedList_1.LinkedList();
    }
    isEmpty() {
        return !this.data.size() ? true : false;
    }
    /**
     * Push() adds an item to the end of the list and returns the new length of the list.
     * @param {T} item - T - The item to be added to the stack.
     * @returns The size of the data structure.
     */
    push(item) {
        this.data.addLast(item);
        return this.data.size();
    }
    /**
     * "Remove the last item from the list and return it."
     *
     * The ?. operator is a new operator in TypeScript 3.7. It's called the optional chaining operator.
     * It's used to access a property of an object that may be undefined or null
     * @returns The last item in the list.
     */
    pop() {
        var _a;
        return (_a = this.data.removeLast()) === null || _a === void 0 ? void 0 : _a.item;
    }
    /**
     * "Return the last item in the data list, or null if the list is empty."
     *
     * The first thing we do is call the getLast() method on the data list. This returns the last item in
     * the list, or null if the list is empty
     * @returns The last item in the data array.
     */
    top() {
        var _a, _b;
        return (_b = (_a = this.data.getLast()) === null || _a === void 0 ? void 0 : _a.item) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Return the size of the data.
     * @returns The size of the data list.
     */
    size() {
        return this.data.size();
    }
    clear() {
        this.data = new linkedList_1.LinkedList();
    }
}
exports.llStack = llStack;
//# sourceMappingURL=linkedListStack.js.map