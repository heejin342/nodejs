var o = require('os');
console.log(o.platform()); //window 버전이 찍힌다.

function hello(name){
  console.log('Hi '+ name);
}

hello('hj')
