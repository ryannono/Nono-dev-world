"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListNode = void 0;
/* A ListNode has a value and a pointer to the next ListNode. */
class ListNode {
    constructor(val, next) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}
exports.ListNode = ListNode;
//# sourceMappingURL=ListNode.js.map