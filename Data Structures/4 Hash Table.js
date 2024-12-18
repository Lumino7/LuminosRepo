// maps keys to values using a hash function. In most programming languages, dictionaries are usually implemented using hash tables.

class HashTable {
    constructor(size = 50) {
        this.size = size;
        this.buckets = new Array(size).fill(null).map(() => []);
    }

    // Hashing function
    _hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i) * i) % this.size;
        }
        return hash;
    }

    // Set a key-value pair
    set(key, value) {
        const index = this._hash(key);
        const bucket = this.buckets[index];

        // Check if key already exists
        const existing = bucket.find(([k]) => k === key);
        if (existing) {
            existing[1] = value; // Update value if key exists
        } else {
            bucket.push([key, value]); // Insert new key-value pair
        }
    }

    // Get a value by key
    get(key) {
        const index = this._hash(key);
        const bucket = this.buckets[index];
        const found = bucket.find(([k]) => k === key);
        return found ? found[1] : undefined; // Return value if found, else undefined
    }

    // Remove a key-value pair
    remove(key) {
        const index = this._hash(key);
        const bucket = this.buckets[index];
        const foundIndex = bucket.findIndex(([k]) => k === key);
        if (foundIndex !== -1) {
            bucket.splice(foundIndex, 1); // Remove key-value pair if found
            return true;
        }
        return false;
    }
}

// Example usage:
const hashTable = new HashTable();
hashTable.set('name', 'Alice');
hashTable.set('age', 30);

console.log(hashTable.get('name')); // Output: Alice
console.log(hashTable.get('age')); // Output: 30

hashTable.remove('name');
console.log(hashTable.get('name')); // Output: undefined
