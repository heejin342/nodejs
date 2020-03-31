var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
// 밑에 숫자가 키값. 서버에서 키값을 이용해 암호화해서 쿠키 저장
app.use(cookieParser("efghjhgbnbh"));

app.listen(3003, function(){
  console.log('connected 3003 port!!!!!!!');
});

app.get('/count', function(req,res){
  // count 변수에 1을 준다.
  // res.cookie('count',1);
  if(req.signedCookies.count){
    // 숫자로 바꿔줘야함. 문자로들어오거든
    var count = parseInt(req.signedCookies.count);
  } else {
    var count=0;
  }
  count = count+1
  res.cookie('count', count , {signed:true});
  res.send('count: ' + req.cookies.count);
});

//데이터 베이스 대역의 배열
var products = {
  1:{title:'The history of web1'},
  2:{title:'The next web'}
};
app.get('/products',function(req,res){
  var output = '';
  for(var name in products){
    output += `<li><a href="/cart/${name}">${products[name].title}</a></li>`
    // console.log(products[name].title);
  }
  res.send(`<h1>products</h1><ul>${output}</ul><a href="/cart">Cart</a>`);
});



/*
cart = {
  1:3,
  // 1번째 제품이 3개 담겼다
  2:1
}
*/
app.get('/cart/:id' , function(req,res){
  var id = req.params.id;
  if(req.signedCookies.cart){
    var cart= req.signedCookies.cart;
  }
  else{// 처음 접근했을때
    var cart = {};
  }
  if(!cart[id]){
    cart[id]=0;
  }
  cart[id] = parseInt(cart[id]) + 1;
  res.cookie('cart', cart, {signed:true});
  res.redirect('/cart');
});

app.get('/cart', function(req, res){
  var cart= req.signedCookies.cart;
  if(!cart){
    res.send('empty');
  }else{
    var output = '';
    for(var id in cart){
      output +=`<li>${products[id].title} (${cart[id]})</li>`;
    }
  }
  res.send(`<h1>Cart</h1><ul>${output}</ul><a href="/products">Product list</a>`);
});
