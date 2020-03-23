// const 는 바뀌지 않기 떄문에 이걸로 하는게 나음
const http = require('http');
const hostname = '127.0.0.1';
const port = 1337;

// 서버를 만든다 . 위아래 같은거임
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');  //응답하면 실행되는 코드
}).listen(port, hostname, () => { //웹서벼는 1337 포트로 접속가능하게해
  console.log(`Server running at http://${hostname}:${port}/`);
});

var server = http.createServer(function(req,res){
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});
server.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
};
