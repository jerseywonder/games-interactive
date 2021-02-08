export default function multiples(arr, multiplyer) {

    let array = []

    arr.forEach(function(num) {
        if (num % multiplyer === 0 ) {
            array.push(num)
        }
    });

    return array
     
}