export default function unique(arr) {

    var unique = [];
    for ( i = 0; i < arr.length; i++ ) {
        var current = arr[i];
        if (unique.indexOf(current) < 0) unique.push(current);
    }
    return unique;
     
}