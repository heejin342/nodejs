// 필요한 모듈을 임포트 . 그걸 _라는 변수에 넣음
var _ = require('underscore');

var arr = [3,6,9,1,12];
console.log(arr[0]);
console.log(_.first(arr));

console.log(arr[arr.length-1]);
console.log(_.last(arr));
