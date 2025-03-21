// Linked list data structure
let linkedList = {
  head: null,
  size: 0,
};

// Node class
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// Animation state
let animationState = {
  operation: null, // 'add' or 'remove'
  value: null,
  step: 1,
  maxSteps: 0,
  animating: false,
  animationSpeed: 100, // frame count
  mode: 'step', // 'step' or 'animate'
};

// Code snippets
const codeSnippets = {
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
  ]
};

const stepDescDiv = document.getElementById('step-description');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const addBtn = document.querySelectorAll('.add-btn');
const removeBtn = document.querySelectorAll('.remove-btn')

// Step descriptions
const stepDescriptions = {
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
    'Initialize prev pointer to head and current pointer to head.next',
    'Loop through the list',
    'Check if the current node contains the target value',
    'Node containing target value is removed from the list'
  ],
};

// P5 sketch
const canvasWidth = 500;
const canvasHeight = 360;
let animationCount = 0;
let sketch = function (p) {
  p.setup = function () {
    let canvas = p.createCanvas(canvasWidth, canvasHeight);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(16);

    // Initialize with some nodes
    addNode(1);
    addNode(2);
    addNode(3);
    addNode(4);
    addNode(5);
  };

  p.draw = function () {
    p.clear();
    drawLinkedList();

    if (animationState.animating && animationState.mode === 'animate') {
      animationCount++;
      if (animationCount % animationState.animationSpeed === 0) {
        // Advance every second
        nextStep();
      }
    }
  };

  // Draw the linked list
  function drawLinkedList() {
    const listDefaultX = 15;
    const listDefaultY = 120;
    let x = listDefaultX;
    let y = listDefaultY;
    const nodeWidth = 50;
    const nodeHeight = 40;
    const nextSize = 40
    const boxSize = nodeWidth + nextSize;
    let spacing = 80;
    const focusedColor = p.color(255, 0, 0)

    // Draw Head label
    const headX = 15;
    const headY = 30;
    const headWidth = 50;
    const headHeight = 40;
    p.push();
    p.fill(200);
    p.stroke(150);
    p.rect(headX, headY, headWidth, headHeight);
    p.fill(0);
    p.noStroke();
    p.text('Head', headX + headWidth / 2, headY + headHeight / 2);
    p.pop();

    // If empty list
    if (linkedList.head === null) {
      return;
    }

    // Draw nodes
    let current = linkedList.head;
    let count = 0;
    let prev = { x: listDefaultX, y: listDefaultY };
    let strokeSize = 1;

    while (current !== null) {
      let strokeColor = p.color(150);
      let fillColor = p.color(200);
      let isNewLine = false;

      // Draw box to next line (shifting the position)
      if(x + boxSize > canvasWidth) {
        x = listDefaultX;
        y += nodeHeight * 2;
        isNewLine = true;
      }

      if(animationState.operation === 'add' && animationState.step === 3 && current === linkedList.head) {
        strokeColor = focusedColor;
      } else {
        strokeColor = p.color(150);
      }


      if(animationState.operation === 'remove') {

        if(current === linkedList.head
            && (animationState.step === 1 || animationState.step === 2)
          ) {
          strokeColor = focusedColor;
        }

        if(animationState.step === 3 || animationState.step === 4) {
          if(count === 0) {
            strokeColor = p.color(88, 237, 167);
            fillColor = p.color(88, 237, 167);
          }
          if(count === 1) {
            strokeColor = focusedColor;
            fillColor = focusedColor;
          }
        }
      }

      // Draw data box
      p.push();
      p.fill(fillColor);
      p.strokeWeight(strokeSize);
      p.stroke(strokeColor);
      p.rect(x, y, nodeWidth, nodeHeight);
      p.fill(0);
      p.noStroke();
      p.text(current.data, x + nodeWidth / 2, y + nodeHeight / 2);
      p.pop();

      // Draw next box
      p.push();
      p.fill(240);
      p.strokeWeight(strokeSize);
      p.stroke(strokeColor);
      p.rect(x + nodeWidth, y, nextSize, nextSize);
      p.fill(0);
      p.noStroke();
      p.text('Next', x + nodeWidth + nextSize / 2, y + nextSize / 2);
      p.pop();

      if (!(current === linkedList.head)) {
        // console.log(isNewLine);
        // Draw arrow
        if(isNewLine) {
          p.push();
          p.stroke(0);
          p.line(
            prev.x + nodeWidth / 2,
            prev.y + nodeHeight,
            listDefaultX + nodeWidth / 2,
            y
          );
          p.pop();
        } else {
          p.push();
          p.stroke(0);
          p.line(
            prev.x + boxSize,
            prev.y + nodeHeight / 2,
            x,
            y + nodeHeight / 2
          );
          p.pop();
        }
      }

      prev.x = x;
      prev.y = y;
      x += nodeWidth + spacing;
      current = current.next;
      count++;
    }

    // Draw head pointer
    if (linkedList.head !== null) {
      let strokeC = p.color(0);
      if(animationState.operation === 'add' && animationState.step === 3) {
        strokeC = focusedColor;
      }
      const lineEndX = listDefaultX + nodeWidth / 2;
      p.push();
      p.stroke(strokeC);
      p.line(headX + headWidth / 2, headY + headHeight, lineEndX, listDefaultY);
      p.line(lineEndX, listDefaultY, lineEndX + 5, listDefaultY - 5);
      p.line(lineEndX, listDefaultY, lineEndX - 5, listDefaultY - 5);
      p.pop();
    }

    // Draw new node if animating
    if (animationState.operation && animationState.step > 0) {
      let description =
        stepDescriptions[animationState.operation][animationState.step];

      stepDescDiv.textContent = description;

      if(animationState.operation === 'add'){
        const newNodeX = 140;
        const newNodeY = 30;
        const newNodeBorder = p.color(255, 0, 0);
        if(animationState.step === 1 || animationState.step === 2){
          // Draw data box
          p.push();
          p.fill(200);
          p.stroke(newNodeBorder);
          p.rect(newNodeX, newNodeY, nodeWidth, nodeHeight);
          p.fill(0);
          p.noStroke();
          p.text(animationState.value, newNodeX + nodeWidth / 2, newNodeY + nodeHeight / 2);
          p.pop();

          // Draw next box
          p.push();
          p.fill(240);
          p.stroke(newNodeBorder);
          p.rect(newNodeX + nodeWidth, newNodeY, nextSize, nextSize);
          p.fill(0);
          p.noStroke();
          p.text('Next', newNodeX + nodeWidth + nextSize / 2, newNodeY + nextSize / 2);
          p.pop();
        }

        if(animationState.step === 2) {
          p.push();
          p.stroke(newNodeBorder);
          p.line(newNodeX + nodeWidth / 2, newNodeY + nodeHeight, listDefaultX + nodeWidth / 2 + 10, listDefaultY);
          // p.line(lineEndX, listDefaultY, lineEndX + 5, listDefaultY - 5);
          // p.line(lineEndX, listDefaultY, lineEndX - 5, listDefaultY - 5);
          p.pop();
        }
      }
    }
  }
};

// Add a node to the linked list
function addNode(value) {
  let newNode = new Node(value);
  newNode.next = linkedList.head;
  linkedList.head = newNode;
  linkedList.size++;
}

// Remove the head node (for clicking the prev button)
function removeHead() {
  if (linkedList.head === null) return;

  linkedList.head = linkedList.head.next;
  linkedList.size--;
}

// Remove a node from the linked list
function removeNode(value) {
  if (linkedList.head === null) return;

  if (linkedList.head.data === value) {
    return;
  }

  let current = linkedList.head;
  while (current.next !== null && current.next.data !== value) {
    current = current.next;
  }

  if (current.next !== null) {
    current.next = current.next.next;
    linkedList.size--;
  }
}

// Start add animation
function startAddAnimation(value) {
  resetAnimation();
  animationState.operation = 'add';
  animationState.value = value;
  animationState.maxSteps = 3;
  document.getElementById('code-display').innerHTML = codeSnippets.add[1];

  if (animationState.mode === 'animate') {
    animationState.animating = true;
    disableStepBtns();
  }
}

// Start remove animation
function startRemoveAnimation(value) {
  resetAnimation();
  animationState.operation = 'remove';
  animationState.value = value;
  animationState.maxSteps = 7;
  document.getElementById('code-display').innerHTML = codeSnippets.remove[1];

  if (animationState.mode === 'animate') {
    animationState.animating = true;
    disableStepBtns();
  }
}

// Reset animation state
function resetAnimation() {
  animationState.step = 1;
  animationCount = 0;
  animationState.animating = false;
  stepDescDiv.classList.add('show');
  nextBtn.disabled = false;
  addBtn.forEach(btn => btn.disabled = true);
  removeBtn.forEach(btn => btn.disabled = true);
}

function nextSnipet () {
  if (animationState.operation === 'add') {
    document.getElementById('code-display').innerHTML =
      codeSnippets.add[animationState.step];
  } else {
    document.getElementById('code-display').innerHTML =
      codeSnippets.remove[animationState.step];
  }
}

function disableStepBtns() {
  nextBtn.disabled = true;
  prevBtn.disabled = true;
}

function enableStepBtns() {
  nextBtn.disabled = false;
  prevBtn.disabled = false;
}

// Go to next step
function nextStep() {
  if (!animationState.operation) return;

  if(animationState.step === animationState.maxSteps) {
    stepDescDiv.classList.remove('show');
    animationState.step++;
    nextSnipet();
    disableStepBtns();
    animationState.operation = null;
    addBtn.forEach(btn => btn.disabled = false);
    removeBtn.forEach(btn => btn.disabled = false);

    if (animationState.mode === 'animate') {
      animationState.animating = false;
    }
  }

  if (animationState.step < animationState.maxSteps) {

    stepDescDiv.classList.add('show');
    animationState.step++;
    nextSnipet();

    if(animationState.animating) disableStepBtns();
    else enableStepBtns();

    if (animationState.step === animationState.maxSteps) {
      if (animationState.operation === 'add') {
        addNode(animationState.value);
      } else {
        removeNode(animationState.value);
      }
    }
  }
}

function prevStep() {
  if (!animationState.operation) return;

  if(animationState.step <= 1) {
    stepDescDiv.classList.remove('show');
  } else {
    stepDescDiv.classList.add('show');
  }

  if(animationState.step === 2) {
    prevBtn.disabled = true;
  }

  if (animationState.step > 0) {
    animationState.step--;

    if (animationState.operation === 'add') {
      document.getElementById('code-display').innerHTML =
        codeSnippets.add[animationState.step];
      if(animationState.step === 2) removeHead();
    } else {
      document.getElementById('code-display').innerHTML =
        codeSnippets.remove[animationState.step];
    }
  }
}

const errorMsg = document.getElementById('errorMsg');

function validate(value, input) {
  if(isNaN(value)) {
    errorMsg.classList.remove('hide');
    input.value = '';
    input.focus();
    return false;
  }
  errorMsg.classList.add('hide');
  return true;
}

window.onload = function () {
  new p5(sketch, document.getElementById('visualization'));

  addBtn.forEach(button => {
    button.addEventListener('click', function() {
      const input = this.previousElementSibling;
      const value = input.value;
      if(!validate(value, input)) return;

      if (value) {
        startAddAnimation(value);
      }
    });
  });

  removeBtn.forEach(button => {
    button.addEventListener('click', function() {
      const input = this.previousElementSibling;
      const value = input.value;
      if(!validate(value, input)) return;

      if (value) {
        startRemoveAnimation(value);
      }
    });
  });

  nextBtn.addEventListener('click', nextStep);
  prevBtn.addEventListener('click', prevStep);

  document.getElementById('step').addEventListener('change', function () {
    animationState.mode = 'step';
    animationState.animating = false;
  });

  document.getElementById('animate').addEventListener('change', function () {
    animationState.mode = 'animate';
    if (animationState.operation) {
      animationState.animating = true;
    }
  });

  document.getElementById('uml-view-toggle').addEventListener('change', () => {
    document.getElementById('uml-table').classList.toggle('hide');
    document.getElementById('normal-view').classList.toggle('hide');
  });

  // Update both inputs when the value is changed
  const removeInputs = document.querySelectorAll('.remove-input');
  removeInputs.forEach((el) => {
    el.addEventListener('change', function(e) {
      removeInputs.forEach(inp => {
        inp.value = e.target.value;
      })
    })
  });

  const addInputs = document.querySelectorAll('.add-input');
  addInputs.forEach((el) => {
    el.addEventListener('change', function(e) {
      addInputs.forEach(inp => {
        inp.value = e.target.value;
      })
    })
  });
};