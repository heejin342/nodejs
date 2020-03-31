var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
app.listen(3003, function(){
  console.log('connected 3003 port!!!!!!!');
});
// 세션 사용 준비
app.use(session({
  secret: '1234svfdfg',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended:false}));

// 다른사람이 여기에 접속하면 count 값을 다르게 센다.
// connect id 별로 별도의 데이터를 메모리에 축적 할 수 있다.
// 서버 껏다켜도 다시 처음부터 카운팅된다.
app.get('/count',function(req,res){
  if(req.session.count){
    req.session.count++;
  }
  else{
    req.session.count=1;
  }
  res.send('count:' + req.session.count);
});
app.get('/welcome' , function(req,res){
  if(req.session.displayName){
    res.send(`
      <h1>Hello, ${req.session.displayName}</h1>
      <a href="/auth/logout">Logout</a>
      `);
  }else{
    res.send(`
      <h1>Welcome</h1>
      <a href="/auth/login">Login</a>
      `);
  }
});
app.post('/auth/login', function(req,res){
  var user={
    username:'egoing',
    password:'111',
    displayName:'Egoing'
  };
  var uname = req.body.username;
  var pwd = req.body.password;
  if(uname===user.username && pwd===user.password){
    req.session.displayName = user.displayName;
    res.redirect('/welcome');
  }else{
    res.send('whod are you <a href="/auth/login">login</a>');
  }
});
app.get('/auth/logout', function(req, res){
// 세션에저장된거 delete
  delete req.session.displayName;
  res.redirect('/welcome');
});

app.get('/auth/login', function(req,res){
  var output= `
  <h1>login</h1>
  <form action="/auth/login" method="post">
    <p><input type="text" name='username' placeholder="username"></p>
    <p><input type="password" name='password' placeholder="password"></p>
    <p><input type="submit"></p>
  </form>
  `;
  res.send(output);
})
