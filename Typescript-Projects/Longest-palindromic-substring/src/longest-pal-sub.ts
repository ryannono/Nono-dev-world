/* A Node is a class that has a character, a next, and a previous. */
class Node {
  character?: string;
  next?: Node;
  previous?: Node;

  constructor(passedCharacter?: string, passedNext?: Node) {
    this.character = passedCharacter;
    this.next = passedNext;
  }
}

/* Creating a linked list. */
class LinkedList {
  front?: Node;
  back?: Node;
  length: number;

  constructor(passedList?: LinkedList) {
    this.front = passedList?.front;
    this.back = passedList?.back;
    this.length = passedList?.length ?? 0;
  }

  /**
   * If there is no back node, set the front to the new node, otherwise set the back node's next to the
   * new node and the new node's previous to the back node, then set the back to the new node
   * @param {Node} newNode - The node that we want to add to the end of the list.
   * @returns The new node is being returned.
   */
  push(newNode: Node) {
    const currentback = this.back;
    if (!currentback) {
      this.front = newNode;
    } else {
      currentback.next = newNode;
      newNode.previous = currentback;
    }
    this.back = newNode;
    this.length++;
    return this;
  }

  /**
   * set the front and back to undefined, and set the length to 0.
   */
  clear() {
    this.front = undefined;
    this.back = undefined;
    this.length = 0;
  }

  /**
   * If the front node exists and has a next node, then set the front node to the next node, set the
   * front node's previous node to undefined, and decrement the length
   */
  removeFromFront() {
    if (!this.front?.next) {
      this.clear();
    } else {
      this.front = this.front.next;
      this.front.previous = undefined;
      this.length--;
    }
  }

  /**
   * If there is a back node, set the back node to the previous node, set the back node's next to
   * undefined, and decrement the length
   */
  removeFromBack() {
    if (!this.back?.previous) {
      this.clear();
    } else {
      this.back = this.back.previous;
      this.back.next = undefined;
      this.length--;
    }
  }
}

/**
 * We start at the front and back of the list, and we move towards the middle of the list, comparing
 * the characters of the elements we're on. If we ever find a mismatch, we return false. If we make it
 * all the way to the middle of the list without finding a mismatch, we return true
 * @param {LinkedList} list - LinkedList - the list to check
 * @returns a boolean value.
 */
function isPalindromicList(list: LinkedList) {
  if (!list.front || !list.back) return false;
  let leftSideElement = list.front,
    rightSideElement = list.back;
  while (leftSideElement !== rightSideElement) {
    if (leftSideElement?.character !== rightSideElement?.character) {
      return false;
    }
    if (leftSideElement.next === rightSideElement) break;
    if (leftSideElement.next && rightSideElement.previous) {
      leftSideElement = leftSideElement.next;
      rightSideElement = rightSideElement.previous;
    }
  }
  return true;
}

/**
 * While the front of the list has a character, add that character to the output string and move to the
 * next node.
 * @param {LinkedList} list - LinkedList - the linked list to be converted to a string
 * @returns A string
 */
function createString(list: LinkedList) {
  let output = '';
  let front = list.front;
  while (front?.character) {
    output += front.character;
    front = front.next;
  }

  return output;
}

/**
 * We're going to iterate through the string, adding each character to a linked list, and then checking
 * if the linked list is a palindrome. If it is, we'll check if it's the longest palindrome we've found
 * so far. If it's not, we'll remove the first character from the linked list and check again. If it's
 * still not a palindrome, we'll remove the last character from the linked list and check again
 * @param {string} fullString - the string we're looking for the longest palindromic substring in
 * @returns The longest palindromic substring in the given string.
 */
function longestSubstring(fullString: string) {
  const stringlength = fullString.length,
    list = new LinkedList();
  let longestPalSub = '',
    i = 0;

  while (i < stringlength) {
    while (i <= stringlength) {
      console.log('frnt: ' + createString(list));
      if (list.length > longestPalSub.length && isPalindromicList(list)) {
        longestPalSub = createString(list);
        console.log('passed first pass');
      }

      const currentCharacter = fullString[i];
      list.push(new Node(currentCharacter));
      i++;
    }
    list.removeFromFront();

    while (list.length > longestPalSub.length) {
      console.log('back: ' + createString(list));
      if (isPalindromicList(list)) {
        longestPalSub = createString(list);
        console.log('passed second pass');
      }
      list.removeFromBack();
      i--;
    }
    list.removeFromFront();
  }

  return longestPalSub;
}

/* It's calling the longestSubstring function and passing in the string 'cbbbbdbibbnbjbobn' as an
argument. */
console.log('final: ' + longestSubstring('cbbibbdbibbnbjbobn'));
