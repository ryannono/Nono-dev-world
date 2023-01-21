"use strict";
// ------------------- List ------------------- //
Object.defineProperty(exports, "__esModule", { value: true });
const ListNode_1 = require("./ListNode");
// ----------- Helper merge function ---------- //
/**
 * It's recursively merging two list in ascending order
 * @param {ListNode} list3 - ListNode - the list that will be returned
 * @param {ListNode | null} [list1] - The first list
 * @param {ListNode | null} [list2] - The second list,
 * @returns A merged list in ascending order
 */
function merger(list3, list1, list2) {
    let nextList1, nextList2;
    if (!list1 || (list2 && list1.val > list2.val)) {
        list3.val = list2.val;
        if (!list1 && !(list2 === null || list2 === void 0 ? void 0 : list2.next))
            return;
        nextList1 = list1;
        nextList2 = list2 === null || list2 === void 0 ? void 0 : list2.next;
    }
    else {
        list3.val = list1.val;
        if (!list2 && !(list1 === null || list1 === void 0 ? void 0 : list1.next))
            return;
        nextList1 = list1.next;
        nextList2 = list2;
    }
    list3.next = new ListNode_1.ListNode();
    return merger(list3.next, nextList1, nextList2);
}
// ------------- List Merger ----------- //
/**
 * We create a new list, and then we merge the two lists into the new list
 * @param {ListNode | null} [list1] - The first list
 * @param {ListNode | null} [list2] - The second list,
 * @returns A new list with the values of the two lists merged together.
 */
function mergeTwoLists(list1, list2) {
    if (!list1 && !list2)
        return null;
    const head = new ListNode_1.ListNode();
    merger(head, list1, list2);
    return head;
}
//# sourceMappingURL=merge-2-sorted-lists.js.map