


//SEARCH ALGORITHMS



//1. LINEAR SEARCH
//checks each element of the list sequentially until the desired element is found or the list ends.
// O(n)
// Ω(1)
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1; //-1 is often used in search functions to indicate not found, to avoid using 0 because [0] is a valid index.
}

//2. BINARY SEARCH
//used for sorted arrays, repeatedly divides the search interval in half until target is found or search interval is empty (left>right).
// O(log n)
// Ω(1)
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const mid = (left + right - ((left + right) % 2)) / 2; // Calculate the middle index
        if (arr[mid] === target) {
            return mid; // Target found, return the index
        } else if (arr[mid] < target) {
            left = mid + 1; // Search in the right half
        } else {
            right = mid - 1; // Search in the left half
        }
    }
    return -1; // Target not found
}


//_________________________________________




//SORT ALGORITHMS




//1. BUBBLE SORT
// compares adjacent items, and swaps them if they are in the wrong order, repeated until the list is sorted.
// O(n2)
// Ω(n) (better than selection sort when the array is nearly sorted.)
function bubbleSort(arr) {
    let n = arr.length;
    let swapped;
    for (let i = 0; i < n - 1; i++) { //for the length of the array
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) { //decreases with each pass because the last element/s the array are sorted already.
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; //swapping the values using js destructuring syntax.
                swapped = true;
            }
        }
        if (!swapped) break;//terminates the sort if the array is already sorted before the outer loop ends (n-1)
    }
    return arr;
}
//without destructuring, swapping would be:
temp = arr[j];
arr[j] = arr[j + 1];
arr[j + 1] = temp;
swapped = true;

//2. INSERTION SORT
//works similarly to sorting playing cards in your hands.
//You start with an empty left hand and the cards face down on the table.
//You then pick the cards one by one and insert them into the correct position in your left hand.
//The left hand cards are always sorted.
// O(n2)
// Ω(n) works better than bubble sort for small or  partially sorted arrays.
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) { //for the length of the array starting at the 2nd element
        let key = arr[i]; //key is the current element to be inserted to the sublist.
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {//while there is still unsorted elements and the curent element > key
            arr[j + 1] = arr[j]; //copy current element to the right
            j--;
        }
        arr[j + 1] = key; //then "insert" the key to the previous element. Remember that the key is still arr[i].
    }
    return arr;
}


//3. SELECTION SORT
// finds the minimum element from the unsorted portion of the list and swaps it with the first unsorted element (on the left).
//Repeats until the list is sorted.
// O(n2)
// Ω(n2) best used when memory writes are expensive.
//pseudocode:
`
repeat (numOfElements - 1) times
    set the first unsorted element as the minimum
    for each of the unsorted elements
        if element < currentMinimum
            set element as new minimum
    swap minimum with first unsorted position
`

function selectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) { //for the length of the array
        let minIndex = i; //set the first unsorted element as the minimum
        for (let j = i + 1; j < n; j++) { // Find the index of the smallest element in the remaining unsorted portion
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]; // swap minimum with first unsorted position
        }
    }
    return arr;
}


//4. MERGE SORT
// divides the array into smaller subarrays, sorts those subarrays, and then merging them back together.

//in pseudocode:
// If only one number
//     Quit
// Else
//     Sort left half of number
//     Sort right half of number
//     Merge sorted halves

// O(n log n) n multiplied by logn
// Ω(n log n)

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    // Merge the two arrays while there are elements in both
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]); //push adds an element to the end of an array.
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }
    // Concatenate any remaining elements
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
  // Recursive function to perform merge sort
function mergeSort(array) {
    if (array.length <= 1) {
      return array; // Base case: a single element is already sorted
    }
    const middle = Math.floor(array.length / 2); //Finds the middle element. Math.floor rounds down a number to the nearest integer.
    const left = array.slice(0, middle); //slice creates a new array from the index of the 1st argument to but not including the 2nd argument.
    const right = array.slice(middle);
    // Recursively sort and then merge
    return merge(mergeSort(left), mergeSort(right));
}



//5. QUICKSORT
// selects a 'pivot' element from the array and partitioning the other elements into two sub-arrays,
// according to whether they are less than or greater than the pivot.
// The sub-arrays are then sorted recursively.
// O(n2)
// Ω(n log n)

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)]; //make a concatenated array using the left array, pivot at the middle, and the right array.
}
