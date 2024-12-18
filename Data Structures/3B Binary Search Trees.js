// a binary tree with an additional constraint:
// for each node, the left child contains only nodes with values less than the node’s value,
//  and the right child contains only nodes with values greater than the node’s value.

    4
   /  \
  2    6
 / \  /  \
1   3 5   7

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new TreeNode(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this._insertNode(this.root, newNode);
    }
  }

  _insertNode(node, newNode) {
    // Compare values to determine where to insert the new node
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this._insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this._insertNode(node.right, newNode);
      }
    }
  }
}

//SEARCH SCRIPTS FOR BSTs ARE EXACTLY THE SAME AS IN BTs.
