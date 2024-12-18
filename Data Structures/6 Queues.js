// follows the First-In-First-Out (FIFO) principle.

class Queue {
    constructor() {
      this.items = [];
    }

    // Add an element to the end of the queue
    enqueue(element) {
      this.items.push(element);
    }

    // Remove an element from the front of the queue
    dequeue() {
      if (this.isEmpty()) {
        throw new Error('Queue is empty');
      }
      return this.items.shift(); // Remove the first element
    }

    // Get the element at the front of the queue
    peek() {
      if (this.isEmpty()) {
        throw new Error('Queue is empty');
      }
      return this.items[0];
    }

    // Check if the queue is empty
    isEmpty() {
      return this.items.length === 0;
    }

    // Get the number of elements in the queue
    size() {
      return this.items.length;
    }

    // Print the queue
    print() {
      console.log(this.items.toString());
    }
  }

  // Example usage
  const queue = new Queue();
  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);

  console.log(queue.peek());  // Output: 1
  console.log(queue.size());  // Output: 3

  console.log(queue.dequeue()); // Output: 1
  console.log(queue.size());   // Output: 2

  queue.print(); // Output: 2,3

