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
    console.log(`left:${left}`)
    console.log(`right:${right}`)
    console.log(`array:${arr}`)
    return [...quickSort(left), pivot, ...quickSort(right)];
}

array = [7,6,5,4,3,2,1];
array = quickSort(array);
console.log(array);
