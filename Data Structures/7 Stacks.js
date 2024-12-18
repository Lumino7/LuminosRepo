// follows the Last-In-First-Out (LIFO) principle.

class Stack {
    constructor() {
        this.items = [];
    }

    // Add an item to the stack
    push(element) {
        this.items.push(element);
    }

    // Remove the item from the top of the stack
    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items.pop();
    }

    // View the top item of the stack
    peek() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items[this.items.length - 1];
    }

    // Check if the stack is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Get the size of the stack
    size() {
        return this.items.length;
    }

    // Clear the stack
    clear() {
        this.items = [];
    }
}

// Example usage
const stack = new Stack();
stack.push(10);
stack.push(20);
console.log(stack.peek());  // 20
console.log(stack.pop());   // 20
console.log(stack.peek());  // 10
console.log(stack.isEmpty()); // false
stack.clear();
console.log(stack.isEmpty()); // true

