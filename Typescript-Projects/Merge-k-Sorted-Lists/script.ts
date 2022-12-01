

 // Definition for singly-linked list.
 class ListNode {

    val: number
    next: ListNode | null

    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}
 

 function merge(list1: ListNode | null, list2: ListNode | null) : ListNode{
    
    // create head node and iterating (moving) node
    let destHead: ListNode | null = new ListNode;
    let currentNode: ListNode | null = destHead;
    
    // while list1 or 2 has an unseen node
    while (list2 || list1){
        
        // if all of list 2 elements have been seen
        // or list1 value is inferior to list2 value
        // append list 1 node to dest linked list
        if (!list2 || (list1 && list1.val <= list2.val)){
            currentNode.val = (list1) ? list1?.val : currentNode.val;
            list1 = (list1) ? list1.next : list1;
        }
        // otherwise append list 2 node
        else{
            currentNode.val = list2.val;
            list2 = list2.next;
        }
        
        // if there exists a unseen non null node
        // create node in dest linked list 
        if (list2 || list1){
            currentNode.next = new ListNode;
            currentNode = currentNode.next;
        }
    }
    
    // return head of new linked list
    return destHead;
}


function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    
    let destHead: ListNode | null = null;
    let len:number = lists.length;
    
    // merge all non null lists
    for (let i:number = 0 ; i < len ; i++){
        if (lists[i]){
            destHead = merge(destHead,lists[i]);
        }
    }
    return destHead;
};





