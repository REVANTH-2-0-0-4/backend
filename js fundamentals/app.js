[1,2,3,4].forEach((item)=>{
    console.log(item);
})

//map returns a new array 
const val = [1,2,3,4,5].map((item)=>{
    return item+2;
})
console.log(val);
// filter also gives a new array  
const filtered_array  = [1,2,3,4,5,6,7,8,9,10].filter((item)=>{
    return item >3 ;
})
console.log(filtered_array);
// find gives the first instance of the required element
const ispresent = [1,2,3,4,5,6,7,8,9].find((val)=>{
     if( val == 2) return val;
})
console.log(ispresent);
const arr= [ 1,2,3,4,5,6,7,8,9];
const idx = arr.indexOf(5);
console.log(idx);

 // objects
  const obj = {
     name :  "harsh",
     age  : 25
  }
 Object.freeze(obj);
    //  obj.age = 14;  works even when the object is in const   
    console.log(obj['age']);



