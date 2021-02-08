// Split an array into groups of a set size
export default function chunkArrayInGroups(arr, size) {
    var result =  arr.reduce((all,one,i) => {
           const ch = Math.floor(i/size); 
           all[ch] = [].concat((all[ch]||[]),one); 
           return all
        }, [])

    return result
}