// a tree-like data structure used for storing a dynamic set of strings where the keys are typically strings.
// It is also known as a prefix tree because it is often used to efficiently handle and retrieve strings based on their prefixes.

     root
     /  \
    c    d
   / \    \
  a   r    o
 /     \    \
t       a    g

class TrieNode {
    constructor() {
        this.children = {}; //An object where each key is a character, and each value is a TrieNode.
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) { //create a node (a new pathway) if it doesn't exist.
                node.children[char] = new TrieNode();
            }
            node = node.children[char]; //move to the next node for the next char. This will be the node you created if it didn't exist.
        }
        node.isEndOfWord = true;
    }

    search(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return node.isEndOfWord;
    }

    startsWith(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return true;
    }
}

// Example usage
const trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple"));   // returns true
console.log(trie.search("app"));     // returns false
console.log(trie.startsWith("app")); // returns true
trie.insert("app");
console.log(trie.search("app"));     // returns true

