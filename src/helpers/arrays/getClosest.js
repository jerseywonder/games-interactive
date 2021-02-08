export default function getClosest(array, num) {

  var i=0;
  var minDiff=1000;
  var ans;
  for(i in array) {
    var m=Math.abs(num-array[i]);
    if(m<minDiff){ 
      minDiff=m; 
      ans=array[i]; 
    }
  }
  return ans;
}