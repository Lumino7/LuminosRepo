// a tree data structure where each node has at most two children, referred to as the left child and the right child.
//Representing hierarchical structures such as organizational charts, file systems, or XML/JSON data.

     10
   /  \
  5    15
 / \   / \
3   7 12  20


class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new TreeNode(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this._insertLevelOrder(this.root, newNode);
    }
  }

  _insertLevelOrder(root, newNode) {
    const queue = [];
    queue.push(root);

    while (queue.length > 0) {
      const node = queue.shift();

      // Insert the new node in the first available position
      if (node.left === null) {
        node.left = newNode;
        return;
      } else {
        queue.push(node.left);
      }

      if (node.right === null) {
        node.right = newNode;
        return;
      } else {
        queue.push(node.right);
      }
    }
  }

// tree searches usually just checks for the existence of the value in the tree.
// in the cases below, the search functions just traverses through the tree and returns an array of all the values in the tree.

  // Depth-First Search (DFS) - explores as far down a branch as possible before backtracking
  
  // Depth-First Search (DFS) - Pre-order Traversal
  dfsPreOrder(node = this.root, result = []) {
    if (node !== null) {
      result.push(node.value);  // Visit the root
      this.dfsPreOrder(node.left, result);  // Traverse left subtree
      this.dfsPreOrder(node.right, result);  // Traverse right subtree
    }
    return result;
  }

  // Depth-First Search (DFS) - In-order Traversal
  dfsInOrder(node = this.root, result = []) {
    if (node !== null) {
      this.dfsInOrder(node.left, result);  // Traverse left subtree
      result.push(node.value);  // Visit the root
      this.dfsInOrder(node.right, result);  // Traverse right subtree
    }
    return result;
  }

  // Depth-First Search (DFS) - Post-order Traversal
  dfsPostOrder(node = this.root, result = []) {
    if (node !== null) {
      this.dfsPostOrder(node.left, result);  // Traverse left subtree
      this.dfsPostOrder(node.right, result);  // Traverse right subtree
      result.push(node.value);  // Visit the root
    }
    return result;
  }

  // Breadth-First Search (BFS) - explores all nodes at the present depth level before moving on to nodes at the next depth level.
  bfs() {
    const result = [];
    const queue = [];

    if (this.root !== null) {
      queue.push(this.root);
    }

    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node.value);  // Visit the node

      if (node.left !== null) {
        queue.push(node.left);  // Enqueue left child
      }

      if (node.right !== null) {
        queue.push(node.right);  // Enqueue right child
      }
    }

    return result;
  }
}
