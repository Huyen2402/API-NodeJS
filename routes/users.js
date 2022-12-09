var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "WebBanHang"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!!!")
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  var sql = "SELECT * FROM User";
    con.query(sql, function(err, results) {
        if (err) throw err;
        res.send({results})
      });
 
});

router.get('/:id', function(req, res, next){

  var id = parseInt(req.params.id);
 
  var sql = `SELECT * FROM User where ID = ${id}`;
  con.query(sql, function(err, results) {
      if (err) throw err;
      res.send(results);
    });

})
router.post('/', function(req, res, next) {

  var value = req.body;
    var sql = `INSERT INTO user (Email, HoTen, DiaChi, MatKhau) VALUES ('${value.Email}', '${value.HoTen}', '${value.DiaChi}', '${value.MatKhau}')`;
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("inserted!");
    res.send({message: "Create User success!"});
 });
});

router.put('/:id', function(req, res, next) {
  var id= req.params.id;
  var value = req.body;
    var sql = `update user set Email = '${value.Email}' , HoTen = '${value.HoTen}', DiaChi = '${value.DiaChi}', MatKhau = '${value.MatKhau}' where ID = ${id}`;
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("updated!");
    res.send({message: "update User success!"});
 });
});


router.delete('/:ID', function(req, res, next){

  var id = parseInt(req.params.ID);
  console.log( parseInt(req.params.ID))
  var sql = `Delete FROM User where ID = ${id}`;
  con.query(sql, function(err, results) {
      if (err) throw err;
      res.send(results);
    });

})


router.post('/login/', function(req, res){
  var info = req.body;
  var sql = `select * from user where Email = '${info.Email}' and MatKhau = '${info.MatKhau} limit 1'`;
  con.query(sql, function(err, results) {
   
    if (err) throw err;
   
   res.send({status: true});
  

  
  });
})


module.exports = router;
