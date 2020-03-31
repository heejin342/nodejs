var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// 뷰엔진으로 제이드를 이용한다.
app.locals.pretty = true;
app.set('view engine' , 'jade')
app.set('veiws', './views')

// 정적파일이 위치할 디렉토리를 정함(Wpublic)
// 이런식으로 이미지도 가능하다.
app.use(express.static('public'));

// 사용자가 접속하면 바디파서가 작동해서 post 형식으로 보낸 요청을 후생할 수 있도록 해줌
// 얘가 있어야지 app.post가 작동한다. 여기서는 body의 객체를 사용할 수 있다.
app.use(bodyParser.urlencoded({extended:false}))

// 이게 겟방식이 아니라 post 면 form.jade에서 바꿔주고 , url에 쿼리스트링이 안보임
app.get('/form', function(req, res){
  res.render('form');
});
app.get('/form_reciever', function(req, res){
  // res.send('Hello,Get')
  var title = req.query.title;
  var description = req.query.description;
  res.send(title + ',' + description);
});
app.post('/form_reciever',function(req, res){
  // res.send('hello,post')
  var title= req.body.title;
  var description = req.body.description;
  res.send(title + ',' + description);
});



// 이게 쿼리스트링방식 . 밑에는 시멘틱방식
app.get('/topic', function(req, res){
  // res.send(req.query.id + ',' +  req.query.name);
  // 요청 관리는 req 인자를 이용한다.
  // 쿼리 스트링으로 전달된값이 아이디의 프로퍼티로 들어온다. ex> ?id=1
  // 윗 값을 send 하니까 웹페이지에 잔달받은 id 를 뿌려준다.
  var topics = ['JS is ...' , 'Nodejs is ...', 'Express is ...'];

  // ${topics[req.query.id]} 는 앞에$가 들어가서 그냥 스트링이아니라 변수라는 의미를준다.
  var output = `
    <a href= "/topic?id=0">js</a><br>
    <a href= "/topic?id=1">Nodejs</a><br>
    <a href= "/topic?id=2">Express</a><br><br>
    ${topics[req.query.id]}
  `
  res.send(output)
  // 이거 주석 풀면 두번 같은 쿼리를 던지는거여서 에러뜬다.
  // res.send(topics[req.query.id]);
});

app.get('/pathtopic/:id' , function(req,res){
  var topics = ['JS is ...' , 'Nodejs is ...', 'Express is ...'];
  var output = `
    <a href= "/pathtopic/0">js</a><br>
    <a href= "/pathtopic/1">Nodejs</a><br>
    <a href= "/pathtopic/2">Express</a><br><br>
    ${topics[req.params.id]}
  `
  res.send(output);
});


//여러개의 파라미터에 대한 시멘틱방식
app.get('/pathtopic/:id/:mode' , function(req,res){
  res.send(req.params.id + ','+ req.params.mode)
});


app.get('/template', function(req , res){
    // res.send(); 가 아니라 temp  라는 템플릿파일을 렌더링해줘야하낟.
    // res.render('temp' , {time:'helllo'});
    // 현재시간 출력
    // time 이랑 title 은 jade 파일에 변수를 전달하는ㄴ 의미를 가진다
    res.render('temp' , {time:Date(), _title:'Jade'});
});


// 여러페이지 라우팅
// 홈화면에 들어왔을때 이 함수가 실행된다.
app.get('/',function(req, res){
  res.send('hello homepage');
});

app.get('/login' , function(req, res){
  res.send('Login please');
});

// 이게 동적실해. 노드 껏다켜야함
app.get('/dynamic' , function(req, res){
  var lis = "";
  for (var i=0 ; i<5 ; i++){
    lis = lis+'<li>coding</li>';
  }
  var time = Date();
  var output = `
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      Hello, dyanmic.html
      <ul>
      ${lis}
      </ul>
      ${time}
    </body>
  </html>`;
  res.send(output);
})

//3000번 포트와 연결되면 이게 실행된다.
app.listen(3000,function(){
  console.log('connected 3000 port');
});
