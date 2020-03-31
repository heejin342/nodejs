var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tktmzp0502',
  database: 'o2'
});

conn.connect();

// var sql = 'SELECT * FROM topic';
// conn.query(sql, function(err, rows, fields){
//   if(err){
//     console.log(err);
//   }else{
//     // console.log('rows', rows);
//     // console.log('fields', fields);
//     for(var i= 0 ; i<rows.length ; i++){
//       console.log(rows[i].title);
//       console.log(rows[i].description);
//       console.log(rows[i].author);
//
//     }
//   }
// });


//행 insert
// var sql = 'INSERT INTO topic (title, description, author) VALUES("?", "?", "?")';
// var params = ['Supervisor','Watcher','grapittie'];
// conn.query(sql, params, function(err, rows, fields){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(rows.insertId);
//     }
// });


//데이터 수정
// var sql = 'UPDATE topic SET title=? , author=? WHERE id=?';
// var params = ['oo','oo','1'];
// conn.query(sql, params, function(err, rows, fields){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(rows.insertId);
//     }
// });


var sql = 'DELETE FROM topic WHERE id=?';
var params = [1];
conn.query(sql, params, function(err, rows, fields){
  if(err){
    console.log(err);
  }else{
    console.log(rows.insertId);
    }
});

conn.end();
