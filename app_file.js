var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');
var _storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'uploads/')
  },
  filename:function(req, file, cb){
    cb(null, file.originalname + '-' +Date.now())
  }
})//객체의 프로퍼티가 함수형인 두개임
var upload = multer({ storage: _storage })
var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.locals.pretty = true;
app.use('/user', express.static('uploads'));
app.set('views' , './views_files');
app.set('view engine', 'jade');
// 3000번 포트에 접속되면 이거 실행
app.listen(3000,function(){
  console.log('CConneced');
});


app.get('/upload', function(req,res){
  res.render('upload');
});
// upload 라는 미들웨어를이용하면 뒤에있는 함수가 실행되기전에 먼저 실행되는데.
// 이걸통해 req 이라는 값에 사용자가 입력한 데이터가 들어간다.
app.post('/upload', upload.single('userfile') , function(req, res){
  console.log(req.file);
  res.send('Uploaded succesfully'+ req.file.filename);
});


app.get('/topic/new', function(req,res){
  fs.readdir('data', function(err,files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('new', {topics:files});
  });
});

//url에 치고들어오는거는 이거랑 연결도니다..
//라우터 되는 url 을 리스트 형태로 나열할 수있음.
app.get(['/topic','/topic/:id'], function(req,res){
    //무조건실행
    fs.readdir('data', function(err,files){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
      // 토픽 아이디로 접속했을경우만
      var id = req.params.id;
      if(id){
        fs.readFile('data/'+id, 'utf8' , function(err, data){
          if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
          }
          // res.send(data);
          //아이디값이 없을떄
          res.render('view',{topics:files, title:id, description:data});
        })
      }
      else{
        // render(확장자를 뺀 템플릿파일의 이름, 템플릿 파일안으로 주입하고 하즞 데이터)
        //files 의 내용을 토픽스라는 이름으로 가녀올 수 있따.
        res.render('view' , {topics:files, title:'Welcome,' ,description:'hello js for serverside'});
      }
    })
});

// 윗내용 중복
// app.get('/topic/:id', function(req, res){
//   var id= req.params.id;
//   fs.readdir('data', function(err,files){
//     if(err){
//       console.log(err);
//       res.status(500).send('Internal Server Error');
//     }
//     fs.readFile('data/'+id, 'utf8' , function(err, data){
//       if(err){
//         console.log(err);
//         res.status(500).send('Internal Server Error');
//       }
//       // res.send(data);
//       res.render('view',{topics:files, title:id, description:data});
//     })
//   })
// });

app.post('/topic' , function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+title, description, function(err){
    // 인자는 두개. 그리고 콜백함수를 하용한다.
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    // 보내버리고 싶은 주소
    res.redirect('/topic/'+title);
    // res.send("sucess" + title + description);
  });
});
