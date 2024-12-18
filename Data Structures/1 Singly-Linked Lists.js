//a linear data structure where each element (node) points to the next element in the sequence.

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Add a node at the end of the list
    append(value) {
        const newNode = new Node(value);
        if (!this.head) { //make this node the head if there's no head yet.
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) { //iterate to the end of the list
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }

    // Add a node at the beginning of the list
    prepend(value) {
        const newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }

    // Remove a node by value
    remove(value) {
        if (!this.head) return null;

        if (this.head.value === value) {
            this.head = this.head.next;
            this.size--;
            return true;
        }

        let current = this.head;
        let previous = null;

        while (current) {
            if (current.value === value) {
                previous.next = current.next;
                this.size--;
                return true;
            }
            previous = current;
            current = current.next;
        }

        return false;
    }

    // Find a node by value
    find(value) {
        let current = this.head;
        while (current) {
            if (current.value === value) {
                return current;
            }
            current = current.next;
        }
        return null;
    }

    // Print the list
    printList() {
        let current = this.head;
        let result = '';
        while (current) {
            result += current.value + ' -> ';
            current = current.next;
        }
        console.log(result + 'null');
    }
}

