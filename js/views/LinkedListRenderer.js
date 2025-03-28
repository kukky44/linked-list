/**
 * Handles rendering of the linked list visualization
 */
class LinkedListRenderer {
  /**
   * Creates a new linked list renderer
   * @param {p5} p - The p5.js instance
   * @param {LinkedList} linkedList - The linked list to render
   * @param {AnimationController} animationController - The animation controller
   */
  constructor(p, linkedList, animationController) {
    this.p = p;
    this.linkedList = linkedList;
    this.aniCon = animationController;
  }

  /**
   * Setup the renderer
   */
  setup() {
    this.p.createCanvas(CANVAS.WIDTH, CANVAS.HEIGHT);
    this.p.textAlign(this.p.CENTER, this.p.CENTER);
    this.p.textSize(16);

    this.linkedList.populateWithSampleData();
  }

  /**
   * Renders the linked list
   */
  render() {
    this.p.clear();
    this.drawLinkedList();

    if (aniCon.state.animating && aniCon.state.mode === 'animate') {
      aniCon.animationCount++;
      if (aniCon.animationCount % aniCon.state.animationSpeed === 0) {
        // Advance every second
        aniCon.nextStep();
      }
    }
  }

  /**
   * Draws the linked list visualization
   */
  drawLinkedList() {
    // Draw Head label
    this.drawHeadLabel();

    // Draw nodes and connections
    this.drawNodes();

    // Draw head pointer connection
    this.drawHeadConnection();

    // Draw new node if animating
    this.drawNewAddingNode();
  }

  /**
   * Draws the "Head" label
   */
  drawHeadLabel() {
    this.p.push();
    this.p.fill(COLORS.HEAD_FILL);
    this.p.stroke(COLORS.HEAD_STROKE);
    this.p.rect(HEAD.X, HEAD.Y, HEAD.WIDTH, HEAD.HEIGHT);
    this.p.fill(COLORS.TEXT);
    this.p.noStroke();
    this.p.text('Head', HEAD.X + HEAD.WIDTH / 2, HEAD.Y + HEAD.HEIGHT / 2);
    this.p.pop();
  }

  /**
   * Draws all nodes in the linked list
   */
  drawNodes() {
    let x = NODE.DEFAULT_X;
    let y = NODE.DEFAULT_Y;
    const boxSize = NODE.WIDTH + NODE.NEXT_SIZE;
    const spacing = NODE.SPACING;
    const animState = this.aniCon.getState();

    if(this.linkedList.head === null) {
      this.drawHeadConnection();
      this.drawNull(x, y);
    }

    let current = this.linkedList.head;
    const currPointer = this.aniCon.currNodePointer;
    let nodeCount = 0;
    let prev = { x: NODE.DEFAULT_X, y: NODE.DEFAULT_Y };

    while (current !== null) {
      // Draw node visualization
      const isNewLine = this.handleLineWrapping(x, boxSize, y);

      if(isNewLine) {
        x = NODE.DEFAULT_X;
        y += NODE.HEIGHT * 2;
      }

      // Determine node colors based on animation state
      const { strokeColor, fillColor } = this.getNodeColors(current, nodeCount, currPointer, animState);

      if(animState.operation === "remove") {
        this.drawCurrentLabel(nodeCount, currPointer, animState.step, x, y, boxSize);

        if(animState.step === 25) {
          this.drawRemovingConnection(nodeCount, currPointer, x, y, boxSize, isNewLine);
        }
      }

      // Draw data box and next box
      this.drawDataBox(x, y, strokeColor, fillColor, current.data);
      this.drawNextBox(x, y, strokeColor);


      // Draw connector arrows between nodes
      if (!(current === this.linkedList.head)) {
        this.drawNodeConnection(prev, x, y, isNewLine);
      }

      // Update position for next node
      prev.x = x;
      prev.y = y;
      x += NODE.WIDTH + spacing;
      current = current.next;
      nodeCount++;

      if(current === null) {
        const isNewLine = this.handleLineWrapping(x, boxSize, y);

        if(isNewLine) {
          x = NODE.DEFAULT_X;
          y += NODE.HEIGHT * 2;
        }
        this.drawNull(x, y);
        this.drawNodeConnection(prev, x, y, isNewLine);
      }
    }
  }

  /**
   * Draws a null box at the end of the list (start if the list is null)
   * @param {int} x x position of the null box
   * @param {int} y y position of the null box
   */
  drawNull(x, y) {
    this.p.push();
    this.p.fill(COLORS.NODE_NULL);
    this.p.stroke(COLORS.NODE_STROKE);
    this.p.rect(x, y, NODE.WIDTH, NODE.HEIGHT);
    this.p.fill(COLORS.TEXT);
    this.p.noStroke();
    this.p.text("Null", x + NODE.WIDTH / 2, y + NODE.HEIGHT / 2);
    this.p.pop();
  }

  /**
   * Draws a label on the top of the current pointed node when
   * loopging through the list to mrove a node
   * @param {int} nodeCount
   * @param {int} currPointer
   * @param {int} animStep
   * @param {int} x
   * @param {int} y
   * @param {int} boxSize
   */
  drawCurrentLabel(nodeCount, currPointer, animStep, x, y, boxSize) {
    if (animStep >= 3 && animStep  <= 5 || animStep === 12) {
      if (nodeCount === currPointer + 1) {
        this.p.push();
        this.p.fill(COLORS.FOCUS);
        this.p.noStroke();
        this.p.textSize(14);
        this.p.textAlign(this.p.CENTER);
        this.p.text("Current", x + boxSize / 2, y - 12);
        this.p.pop();
      }
    }
  }

  /**
   * Draws a line connecting the previous ndoe and next node of the target node
   * @param {int} nodeCount
   * @param {int} currPointer
   * @param {int} x
   * @param {int} y
   * @param {int} boxSize
   * @param {boolean} isNewLine
   */
  drawRemovingConnection(nodeCount, currPointer, x, y, boxSize, isNewLine) {
    if(nodeCount === currPointer) {
      const connectedX = x + boxSize * 2 + NODE.SPACING + boxSize / 2;
      const offsetY = 17;

      this.p.push();
      this.p.stroke(COLORS.FOCUS);
      this.p.strokeWeight(2);
      this.p.line(x + boxSize / 2, y, x + boxSize / 2, y - offsetY);
      this.p.line(x + boxSize / 2, y - offsetY, connectedX, y - offsetY);
      this.p.line(connectedX, y - offsetY, connectedX, y);
      this.p.pop();
    }
  }

  /**
   * Handles wrapping to a new line if a node would exceed canvas width
   * @param {number} x - Current x position
   * @param {number} boxSize - Size of node box
   * @param {number} y - Current y position
   * @returns {boolean} - True if wrapped to a new line
   */
  handleLineWrapping(x, boxSize, y) {
    if (x + boxSize > CANVAS.WIDTH) {
      x = NODE.DEFAULT_X;
      y += NODE.HEIGHT * 2;
      return true;
    }
    return false;
  }

  /**
   * Gets appropriate colors for a node based on animation state
   * @param {Node} current - Current node being drawn
   * @param {number} nodeCount - Position in the list
   * @param {number} currPointer - Current pointer position
   * @param {Object} animState - Current animation state
   * @returns {Object} - Object containing stroke and fill colors
   */
  getNodeColors(current, nodeCount, currPointer, animState) {
    let strokeColor = this.p.color(COLORS.NODE_STROKE);
    let fillColor = this.p.color(COLORS.NODE_FILL);
    const focusedColor = this.p.color(COLORS.FOCUS);
    if (animState.operation === 'add' && animState.step === 3 && current === this.linkedList.head) {
      strokeColor = focusedColor;
    }

    if (animState.operation === 'remove') {
      if (current === this.linkedList.head && (animState.step === 1 || animState.step === 2)) {
        strokeColor = focusedColor;
      }

      if (animState.step >= 3 && animState.step <= 5 || animState.step === 12 || animState.step === 25) {
        if (nodeCount === currPointer) {
          strokeColor = this.p.color(COLORS.CURRENT);
          fillColor = this.p.color(COLORS.CURRENT);
        }
        if (nodeCount === currPointer + 1) {
          strokeColor = focusedColor;
          fillColor = focusedColor;
        }
      }
    }

    return { strokeColor, fillColor };
  }

  /**
   * Draws the data portion of a node
   * @param {number} x - X position
   * @param {number} y - Y position
   * @param {p5.Color} strokeColor - Stroke color
   * @param {p5.Color} fillColor - Fill color
   * @param {*} data - Node data to display
   */
  drawDataBox(x, y, strokeColor, fillColor, data) {
    this.p.push();
    this.p.fill(fillColor);
    this.p.stroke(strokeColor);
    this.p.rect(x, y, NODE.WIDTH, NODE.HEIGHT);
    this.p.fill(COLORS.TEXT);
    this.p.noStroke();
    this.p.text(data, x + NODE.WIDTH / 2, y + NODE.HEIGHT / 2);
    this.p.pop();
  }

  /**
   * Draws the next pointer portion of a node
   * @param {number} x - X position
   * @param {number} y - Y position
   * @param {p5.Color} strokeColor - Stroke color
   */
  drawNextBox(x, y, strokeColor) {
    this.p.push();
    this.p.fill(COLORS.NEXT_FILL);
    this.p.stroke(strokeColor);
    this.p.rect(x + NODE.WIDTH, y, NODE.NEXT_SIZE, NODE.NEXT_SIZE);
    this.p.fill(COLORS.TEXT);
    this.p.noStroke();
    this.p.text('Next', x + NODE.WIDTH + NODE.NEXT_SIZE / 2, y + NODE.NEXT_SIZE / 2);
    this.p.pop();
  }

  /**
   * Draws connection arrow between nodes
   * @param {Object} prev - Previous node position
   * @param {number} x - Current node x position
   * @param {number} y - Current node y position
   * @param {boolean} isNewLine - Whether node is on a new line
   */
  drawNodeConnection(prev, x, y, isNewLine) {
    this.p.push();
    this.p.stroke(COLORS.TEXT);

    if (isNewLine) {
      // Draw arrow to next line
      this.p.line(
        prev.x + NODE.WIDTH / 2,
        prev.y + NODE.HEIGHT,
        NODE.DEFAULT_X + NODE.WIDTH / 2,
        y
      );
    } else {
      // Draw arrow to next node on same line
      this.p.line(
        prev.x + NODE.WIDTH + NODE.NEXT_SIZE,
        prev.y + NODE.HEIGHT / 2,
        x,
        y + NODE.HEIGHT / 2
      );
    }

    this.p.pop();
  }

  /**
   * Draws the arrow connecting the head label to the first node
   */
  drawHeadConnection() {
    const animState = this.aniCon.getState();
    let strokeColor = this.p.color(COLORS.TEXT);

    if (animState.operation === 'add' && animState.step === 3) {
      strokeColor = this.p.color(COLORS.FOCUS);
    }

    if (animState.operation === 'remove' &&
        this.linkedList.isHeadValue(animState.value) &&
        animState.step === 29) {
      // Special case when removing head
      const lineEndX = NODE.DEFAULT_X + NODE.WIDTH * 3.2;
      this.p.push();
      this.p.stroke(this.p.color(COLORS.FOCUS));
      this.p.line(HEAD.X + HEAD.WIDTH / 2, HEAD.Y + HEAD.HEIGHT, lineEndX, NODE.DEFAULT_Y);
      this.p.pop();
    } else {
      // Normal head pointer
      const lineEndX = NODE.DEFAULT_X + NODE.WIDTH / 2;
      this.p.push();
      this.p.stroke(strokeColor);
      this.p.line(HEAD.X + HEAD.WIDTH / 2, HEAD.Y + HEAD.HEIGHT, lineEndX, NODE.DEFAULT_Y);
      this.p.line(lineEndX, NODE.DEFAULT_Y, lineEndX + 5, NODE.DEFAULT_Y - 5);
      this.p.line(lineEndX, NODE.DEFAULT_Y, lineEndX - 5, NODE.DEFAULT_Y - 5);
      this.p.pop();
    }
  }

  /**
   * Draws the new node being added to the list
   */
  drawNewAddingNode() {
    const animState = this.aniCon.getState();

    if (animState.operation && animState.step > 0) {
      if (animState.operation === 'add') {
        const newNodeBorder = this.p.color(COLORS.FOCUS);

        if (animState.step === 1 || animState.step === 2) {
          // Draw new node during add animation
          this.p.push();

          // Draw data box
          this.p.fill(COLORS.NODE_FILL);
          this.p.stroke(newNodeBorder);
          this.p.rect(NEW_NODE.X, NEW_NODE.Y, NODE.WIDTH, NODE.HEIGHT);
          this.p.fill(COLORS.TEXT);
          this.p.noStroke();
          this.p.text(animState.value, NEW_NODE.X + NODE.WIDTH / 2, NEW_NODE.Y + NODE.HEIGHT / 2);

          // Draw next box
          this.p.fill(COLORS.NEXT_FILL);
          this.p.stroke(newNodeBorder);
          this.p.rect(NEW_NODE.X + NODE.WIDTH, NEW_NODE.Y, NODE.NEXT_SIZE, NODE.NEXT_SIZE);
          this.p.fill(COLORS.TEXT);
          this.p.noStroke();
          this.p.text('Next', NEW_NODE.X + NODE.WIDTH + NODE.NEXT_SIZE / 2, NEW_NODE.Y + NODE.NEXT_SIZE / 2);

          this.p.pop();
        }

        if (animState.step === 2) {
          // Draw connection from new node to list head
          this.p.push();
          this.p.stroke(newNodeBorder);
          this.p.line(
            NEW_NODE.X + NODE.WIDTH / 2, NEW_NODE.Y + NODE.HEIGHT, NODE.DEFAULT_X + NODE.WIDTH / 2 + 10, NODE.DEFAULT_Y);
          this.p.push();
        }
      }
    }
  }
}
