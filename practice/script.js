// let n = 4;
// for(let i=0; i<n; i++){
//     console.log("hello,",i);
// }


// let args = process.argv; 

// for(let i=2; i < args.length; i++){
//     console.log("hello to ", args[i]);
// }

// const math = require("./math");
// console.log(math);
// console.log(math.sum(5,6));
// console.log(math.mul(5,6));
// console.log(math.g);
// console.log(math.PI);

//  let fruits = require("./fruits");
 
//  for(let i=0; i< 3; i++){
//     console.log(fruits[i].Name);
//     // console.log(fruits[i].color);
//  }

// import{mul, PI} from "./math.js";
// console.log(mul(1, 3));


import getRandomWords from 'randomwords'
const randomwords = getRandomWords() // optionally inject 'randombytes' replacement with { randombytes: replacement }
 
console.log(randomwords[1]);
 
