//run node merge.js to try

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Merge the two arrays while there are elements in both
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) { //push the lower element to the result.
        result.push(left[leftIndex]); //push adds an element to the end of an array.
        leftIndex++;
        console.log(`leftIndex:${leftIndex}`);
        console.log(`leftPushResult:${result}`);
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
        console.log(`rightIndex:${rightIndex}`);
        console.log(`rightPushResult:${result}`);
      }
    }

    // Concatenate any remaining elements
    result = result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex)); //exhausted sides will be empty because the sliced index would be at the end.
    console.log(`concatresult:${result}`)
    console.log("------MERGE END------")
    return result; //final output comes from this variable.
}

  // Recursive function to perform merge sort
function mergeSort(array) {
    if (array.length <= 1) {
      return array; // Base case: a single element is already sorted
    }
    const middle = Math.floor(array.length / 2); //Finds the middle element. Math.floor rounds down a number to the nearest integer.
    const left = array.slice(0, middle); //slice creates a new array from the index of the 1st argument to but not including the 2nd argument.
    console.log(`left:${left}`);
    const right = array.slice(middle);
    console.log(`right:${right}`);
    // Recursively sort and then merge
    console.log("------MERGESORT END------")
    return merge(mergeSort(left), mergeSort(right));
}

let x = [7,6,5,4,3,2,1];

try {
    x = mergeSort(x);
    console.log(x);
} catch (error) { //code executed if an error occurs in the try block
    console.log('Error:', error.message); // Handles the error
}

