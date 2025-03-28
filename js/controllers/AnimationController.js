/**
 * Controls animation state and transitions
 */
class AnimationController {
  /**
   * Creates a new animation controller
   * @param {LinkedList} linkedList - The linked list to animate
   * @param {CodeDisplayManager} codeDisplayManager - Manager for code snippets
   * @param {UIController} uiController - Controller for UI updates
   */
  constructor(linkedList, codeDisplayManager, uiController) {
    this.linkedList = linkedList;
    this.codeDisplayManager = codeDisplayManager;
    this.uiController = uiController;

    this.state = {
      operation: null, // 'add' or 'remove'
      value: null,
      step: 1,
      maxSteps: 0,
      animating: false,
      animationSpeed: ANIMATION.SPEED,
      mode: 'step', // 'step' or 'animate'
    };

    this.animationCount = 0;
    this.currNodePointer = 0;
    this.stepStack = [];
  }

  /**
   * Starts an add animation
   * @param {int} value - The value to add
   */
  startAddAnimation(value) {
    this.resetAnimation();
    this.state.operation = 'add';
    this.state.value = value;
    this.state.maxSteps = ANIMATION.STEPS.ADD;

    this.codeDisplayManager.setCode(CODE_SNIPPETS.add[1]);
    this.uiController.setStepDesc(STEP_DESCRIPTIONS.add[1]);

    if (this.state.mode === 'animate') {
      this.state.animating = true;
      this.uiController.disableStepBtns();
    }
  }

  /**
   * Starts a remove animation
   * @param {int} value - The value to remove
   */
  startRemoveAnimation(value) {
    this.resetAnimation();
    this.state.operation = 'remove';
    this.state.value = value;
    this.state.maxSteps = ANIMATION.STEPS.REMOVE;

    this.codeDisplayManager.setCode(CODE_SNIPPETS.remove[1]);
    this.uiController.setStepDesc(STEP_DESCRIPTIONS.remove[1]);

    if (this.state.mode === 'animate') {
      this.state.animating = true;
      this.uiController.disableStepBtns();
    }
  }

  /**
   * Resets animation state to initial values
   */
  resetAnimation() {
    this.state.step = 1;
    this.animationCount = 0;
    this.state.animating = false;

    this.uiController.showStepDesc();
    this.uiController.enableNextBtn();
    this.uiController.disableOperationsBtns();
  }

  /**
   * Moves to the next animation step
   */
  nextStep = () => {
    if (!this.state.operation) return;

    if (this.state.step === this.state.maxSteps) {
      this.finishAnimation();
      if (this.state.mode === 'animate') {
        this.state.animating = false;
      }
      return;
    }

    if(this.state.operation === 'remove') {
      if(this.state.step === 11) {
        this.state.step = this.state.maxSteps - 1;
      }
    }

    if(this.state.operation === 'remove' && this.state.step === 12) {
      this.state.step = 4;
    }

    // Push the current state to the stack (for using in prevStep operation)
    this.stepStack.push(this.state.step);

    if (this.state.step < this.state.maxSteps) {
      this.uiController.showStepDesc();
      this.state.step++;
      this.updateCodeSnippet();

      if(this.state.operation === 'remove') {
        if(this.state.step === 26) {
          this.state.step = ANIMATION.STEPS.REMOVE;
          this.uiController.setStepDesc(STEP_DESCRIPTIONS.removed);
          this.codeDisplayManager.setCode(CODE_SNIPPETS.remove[0]);
        }
      }

      // Special case for removing head node
      if (this.state.operation === 'remove' && this.linkedList.isHeadValue(this.state.value)) {
        if (this.state.step === 3) {
          this.codeDisplayManager.setCode(CODE_SNIPPETS.removeFromHead);
          this.state.step = 29; // Skip to end of animation
        } else if (this.state.step === 30) {
          this.codeDisplayManager.setCode(CODE_SNIPPETS.removeFromHead);
          this.uiController.setStepDesc(STEP_DESCRIPTIONS.removed);
        }
      }

      // When the list has only onde node
      if(this.state.operation === 'remove' && this.state.step === 5) {
        if(this.linkedList.head.next === null) {
          this.uiController.setStepDesc(STEP_DESCRIPTIONS.onlyOne);
          this.codeDisplayManager.setCode(CODE_SNIPPETS.remove[4]);
          this.state.step = 30;
        }
      }

      // For looping through the visualized linked list
      if(this.state.operation === 'remove' && this.state.step === 6) {
        // If the current node contains the target value
        if(this.linkedList.isValueAt(this.currNodePointer, this.state.value)) {
          this.uiController.setStepDesc(STEP_DESCRIPTIONS.found);
          this.codeDisplayManager.setCode(CODE_SNIPPETS.removeTarget);
          this.state.step = 25;
        } else {
          //If the current pointed node's next node is null (end of the list)
          if(this.linkedList.getSize() === this.currNodePointer + 2) {
            this.uiController.setStepDesc(STEP_DESCRIPTIONS.notFound);
            this.state.step = 30;
          } else {
            // When moving the current and prev node
            this.uiController.setStepDesc(STEP_DESCRIPTIONS.notCurrent);
            this.codeDisplayManager.setCode(CODE_SNIPPETS.movePointers);
            this.currNodePointer++;
            this.state.step = 12;
          }
        }
      }

      if (this.state.animating) {
        this.uiController.disableStepBtns();
      } else {
        this.uiController.enableStepBtns();
      }

      // Apply the operation at the final step
      if (this.state.step === this.state.maxSteps) {
        if (this.state.operation === 'add') {
          this.linkedList.addNode(this.state.value);
        } else {
          this.linkedList.removeNode(this.state.value);
        }
      }
    }
  }

  /**
   * Moves to the previous animation step
   */
  prevStep = () => {
    if (!this.state.operation) return;

    // Retrieve the previous step
    const prevStep = this.stepStack.pop();

    if (this.state.step <= 1) {
      this.uiController.hideStepDesc();
    } else {
      this.uiController.showStepDesc();
    }

    if (this.state.step === 2) {
      this.uiController.disablePrevBtn();
    }

    if (this.state.step > 0) {
      this.state.step = prevStep;
      this.updateCodeSnippet();

      if (this.state.operation === 'add') {
        this.codeDisplayManager.setCode(CODE_SNIPPETS.add[this.state.step]);
        if (this.state.step === 2) this.linkedList.removeHead();
      } else {
        this.currNodePointer--;
        this.codeDisplayManager.setCode(CODE_SNIPPETS.remove[this.state.step]);
      }
    }
  }

  /**
   * Updates code snippet based on current state
   */
  updateCodeSnippet() {
    let description = STEP_DESCRIPTIONS[this.state.operation][this.state.step];

    if (this.state.operation === 'remove' &&
        this.state.step === 3 &&
        this.linkedList.isHeadValue(this.state.value)) {
      description = STEP_DESCRIPTIONS.removeFromHead;
    }

    this.uiController.setStepDesc(description);
    this.codeDisplayManager.setCode(CODE_SNIPPETS[this.state.operation][this.state.step]);
  }

  /**
   * Finishes the current animation
   */
  finishAnimation() {
    this.stepStack = [];
    this.uiController.hideStepDesc();
    this.uiController.disableStepBtns();
    this.uiController.enableOperationBtns();
    this.codeDisplayManager.clearCode();
    this.state.operation = null;
  }

  /**
   * Updates animation on each frame
   */
  update() {
    if (this.state.animating && this.state.mode === 'animate') {
      this.animationCount++;
      if (this.animationCount % this.state.animationSpeed === 0) {
        this.nextStep();
      }
    }
  }

  /**
   * Sets the animation mode
   * @param {string} mode - Either 'step' or 'animate'
   */
  setMode(mode) {
    this.state.mode = mode;
    if (mode === 'animate' && this.state.operation) {
      this.state.animating = true;
    } else {
      this.state.animating = false;
    }
  }

  /**
   * Gets the current animation state
   * @returns {Object} The current animation state
   */
  getState() {
    return this.state;
  }
}