//동기식 . 위에서부터 순서대로 실행된다.
var fs = require('fs');
console.log(1);
var data =fs.readFileSync('data.txt' , {encoding:'utf8'});
console.log(data);


// 비동기식

console.log(2);
fs.readFile('data.txt' , {encoding:'utf8'}, function(err,data){
  console.log(3);
  console.log(data);
});
// readFile 작업은 백그라운드로 맡겨버리고 4머저찍음 .

console.log(4);
