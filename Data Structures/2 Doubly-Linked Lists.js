// a data structure where each node contains a reference to both the previous and next node in the sequence. This allows traversal of the list in both directions.

class Node {
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Add a node at the end of the list
    append(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.size++;
    }

    // Add a node at the beginning of the list
    prepend(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.size++;
    }

    // Remove a node from the list
    remove(value) {
        if (!this.head) return null;

        let current = this.head;

        while (current) {
            if (current.value === value) {
                if (current === this.head) {
                    this.head = this.head.next;
                    if (this.head) {
                        this.head.prev = null;
                    } else {
                        this.tail = null;
                    }
                } else if (current === this.tail) {
                    this.tail = this.tail.prev;
                    if (this.tail) {
                        this.tail.next = null;
                    } else {
                        this.head = null;
                    }
                } else {
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                }
                this.size--;
                return current;
            }
            current = current.next;
        }
        return null;
    }

    // Find a node in the list
    find(value) {
        if (!this.head) return null;

        let current = this.head;

        while (current) {
            if (current.value === value) {
                return current;
            }
            current = current.next;
        }
        return null;
    }

    // Print the list from head to tail
    printList() {
        let current = this.head;
        let result = '';
        while (current) {
            result += current.value + ' <-> ';
            current = current.next;
        }
        console.log(result + 'null');
    }

    // Print the list from tail to head
    printReverse() {
        let current = this.tail;
        let result = '';
        while (current) {
            result += current.value + ' <-> ';
            current = current.prev;
        }
        console.log(result + 'null');
    }
}
