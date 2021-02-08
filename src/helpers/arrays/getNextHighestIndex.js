export default function getNextHighestIndex(arr, value) {

    // Return the index of the next highest value in the array. 
    // If there is no value in the array that is higher than the supplied value, 
    // it will return the length of the array. If all values in the array are higher, 
    // it will return 0.
    var i = arr.length;
    while (arr[--i] > value);
    return ++i; 
}