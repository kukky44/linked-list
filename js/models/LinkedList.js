/**
 * Implements a singly linked list data structure
 */
class LinkedList {
  /**
   * Creates a new linked list
   */
  constructor() {
    this.head = null;
    this.size = 0;
  }

  /**
   * Adds a new node with the given value to the front of the list
   * @param {*} value - The value to add
   */
  addNode(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
    return newNode;
  }

  /**
   * Removes the head node from the list
   * @returns {boolean} - True if a node was removed, false if the list was empty
   */
  removeHead() {
    if (this.head === null) return false;

    this.head = this.head.next;
    this.size--;
    return true;
  }

  /**
   * Removes the first node with the given value
   * @param {*} value - The value to remove
   * @returns {boolean} - True if a node was removed, false if no matching node was found
   */
  removeNode(value) {
    if (this.head === null) return false;

    // If head contains the value
    if (this.head.data == value) {
      this.head = this.head.next;
      this.size--;
      return true;
    }

    // Search for the value in the rest of the list
    let prev = this.head;
    let current = this.head.next;

    while (current !== null) {
      if (current.data == value) {
        this.size--;
        prev.next = current.next;
        return true;
      }
      prev = current;
      current = current.next;
    }

    return false; // Value not found
  }

  /**
   * Gets the size of the linked list
   * @returns The size of the linked list
   */
  getSize() {
    return this.size;
  }

  /**
   * Checks if the head node contains the given value
   * @param {int} value - The value to check
   * @returns {boolean} - True if the head node contains the value
   */
  isHeadValue(value) {
    return this.head !== null && this.head.data == value;
  }

  /**
   * Checks if the target node contains the given value
   * @param {int} index The position of the node
   * @param {int} value The value to check
   * @returns True if the target node contains the value
   */
  isValueAt = (index, value) => {
    let targetNode = this.head;
    let i = 0;
    for(let i = 0; i <= index; i++) {
      targetNode = targetNode.next;
    }

    return targetNode.data === Number(value);
  }

  /**
   * Initializes the list with sample data
   */
  populateWithSampleData() {
    this.addNode(5);
    this.addNode(4);
    this.addNode(3);
    this.addNode(2);
    this.addNode(1);
  }
}