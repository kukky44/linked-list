/**
 * Application-wide constants
 */

// Define the canvas width based on the window width
const windowWidth = window.innerWidth
let cw = 500;
if(windowWidth < 980){
  cw = 400;
}
if(windowWidth < 730) {
  cw = 300;
}

// Canvas dimensions
const CANVAS = {
  WIDTH: cw,
  HEIGHT: 360
};

// Node dimensions and positioning
const NODE = {
  WIDTH: 50,
  HEIGHT: 40,
  NEXT_SIZE: 40,
  SPACING: 80,
  DEFAULT_X: 15,
  DEFAULT_Y: 140
};

// Head pointer dimensions and positioning
 const HEAD = {
  X: 15,
  Y: 50,
  WIDTH: 50,
  HEIGHT: 40
};

// New node animation positioning
 const NEW_NODE = {
  X: 140,
  Y: 50
};

// Colors
 const COLORS = {
  NODE_FILL: [200, 200, 200],
  NODE_STROKE: [150, 150, 150],
  NODE_NULL: [250, 250, 250],
  FOCUS: [255, 0, 0],
  CURRENT: [88, 237, 167],
  NEXT_FILL: [240, 240, 240],
  HEAD_FILL: [200, 200, 200],
  HEAD_STROKE: [150, 150, 150],
  TEXT: [0, 0, 0]
};

// Animation settings
 const ANIMATION = {
  SPEED: 100,
  STEPS: {
    ADD: 3,
    REMOVE: 30
  }
};

// Step descriptions
const STEP_DESCRIPTIONS = {
  add: [
    'Starting state.',
    'Create a new Node',
    'Make new Node point to the same place as “head”.',
    'Make “head” point to the new Node',
  ],
  remove: [
    'Starting state',
    'Check if the list is empty',
    'Check if the head node contains the target value',
    'Initialize previous pointer to head and current pointer to head.next',
    'Loop through the list',
    'Check if the current node contains the target value',
    'Node containing target value is removed from the list',
  ],
  removeFromHead: 'If the head contains the target value, make “head” point to the next node',
  removed: 'The node is removed from the list',
  found: 'If the current node contains the target value, make previous next node to the curernt next node',
  notCurrent: 'If not, move the prev and current pointers',
  notFound: 'The target value is not in the list',
  onlyOne: 'The list includes only one node'
};

// Code snippets for animation steps
const CODE_SNIPPETS = {
  add: [
    'public void add(int value) {\n    Node newNode = new Node(value);\n    newNode.next = head;\n    head = newNode;\n}',
    'public void add(int value) {\n    <span class="highlighted">Node newNode = new Node(value);</span>\n    newNode.next = head;\n    head = newNode;\n}',
    'public void add(int value) {\n    Node newNode = new Node(value);\n    <span class="highlighted">newNode.next = head;</span>\n    head = newNode;\n}',
    'public void add(int value) {\n    Node newNode = new Node(value);\n    newNode.next = head;\n    <span class="highlighted">head = newNode;</span>\n}',
    '',
  ],
  remove: [
    'public void remove(int value) {\n    if(head == null) return;\n    \n    if(head.data == value) {\n        head = head.next;\n        return;\n    }\n    \n    Node prev = head;\n    Node current = head.next;\n    while(current != null) {\n        if(current.data == value) {\n            prev.next = current.next;\n            return;\n        }\n        prev = current;\n        current = current.next;\n    }\n}',
    'public void remove(int value) {\n    <span class="highlighted">if(head == null) return</span>;\n    \n    if(head.data == value) {\n        head = head.next;\n        return;\n    }\n    \n    Node prev = head;\n    Node current = head.next;\n    while(current != null) {\n        if(current.data == value) {\n            prev.next = current.next;\n            return;\n        }\n        prev = current;\n        current = current.next;\n    }\n}',
    'public void remove(int value) {\n    if(head == null) return;\n    \n    <span class="highlighted">if(head.data == value) {</span>\n        head = head.next;\n        return;\n    }\n    \n    Node prev = head;\n    Node current = head.next;\n    while(current != null) {\n        if(current.data == value) {\n            prev.next = current.next;\n            return;\n        }\n        prev = current;\n        current = current.next;\n    }\n}',
    'public void remove(int value) {\n    if(head == null) return;\n    \n    if(head.data == value) {\n        head = head.next;\n        return;\n    }\n    \n    <span class="highlighted">Node prev = head;</span>\n    <span class="highlighted">Node current = head.next;</span>\n    while(current != null) {\n        if(current.data == value) {\n            prev.next = current.next;\n            return;\n        }\n        prev = current;\n        current = current.next;\n    }\n}',
    'public void remove(int value) {\n    if(head == null) return;\n    \n    if(head.data == value) {\n        head = head.next;\n        return;\n    }\n    \n    Node prev = head;\n    Node current = head.next;\n    <span class="highlighted">while(current != null)</span> {\n        if(current.data == value) {\n            prev.next = current.next;\n            return;\n        }\n        prev = current;\n        current = current.next;\n    }\n}',
    'public void remove(int value) {\n    if(head == null) return;\n    \n    if(head.data == value) {\n        head = head.next;\n        return;\n    }\n    \n    Node prev = head;\n    Node current = head.next;\n    while(current != null) {\n        <span class="highlighted">if(current.data == value) {</span>\n            prev.next = current.next;\n            return;\n        }\n        prev = current;\n        current = current.next;\n    }\n}',
    'public void remove(int value) {\n    if(head == null) return;\n    \n    if(head.data == value) {\n        head = head.next;\n        return;\n    }\n    \n    Node prev = head;\n    Node current = head.next;\n    while(current != null) {\n        if(current.data == value) {\n            prev.next = current.next;\n            return;\n        }\n        prev = current;\n        current = current.next;\n    }\n}',
    '',
  ],
  removeFromHead: 'public void remove(int value) {\n    if(head == null) return;\n    \n    if(head.data == value) {\n        <span class="highlighted">head = head.next;</span>\n        return;\n    }\n    \n    Node prev = head;\n    Node current = head.next;\n    while(current != null) {\n        if(current.data == value) {\n            prev.next = current.next;\n            return;\n        }\n        prev = current;\n        current = current.next;\n    }\n}',
  movePointers: 'public void remove(int value) {\n    if(head == null) return;\n    \n    if(head.data == value) {\n        head = head.next;\n        return;\n    }\n    \n    Node prev = head;\n    Node current = head.next;\n    while(current != null) {\n        if(current.data == value) {\n            prev.next = current.next;\n            return;\n        }\n        <span class="highlighted">prev = current;</span>\n        <span class="highlighted">current = current.next;</span>\n    }\n}',
  removeTarget: 'public void remove(int value) {\n    if(head == null) return;\n    \n    if(head.data == value) {\n        head = head.next;\n        return;\n    }\n    \n    Node prev = head;\n    Node current = head.next;\n    while(current != null) {\n        if(current.data == value) {\n            <span class="highlighted">prev.next = current.next;</span>\n            return;\n        }\n        prev = current;\n        current = current.next;\n    }\n}',
};