var crypto = require("crypto");//to hash
var rand = require('csprng');// for salting
var express = require("express");// for application
var bodyParser = require('body-parser');//read text
var mysql =require('mysql');//db
var app = express();

//connect // Db
var connection=mysql.createConnection({
  host  :'localhost',
  user  :'root',
  password  :'password',
  database  :'information'
});


var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine','ejs');
app.get('/',function (req,res) {
  res.render('sample');
});
app.use(express.static('logincssfiles'));
app.post('/', urlencodedParser, function (req, res) {

  var username=req.body.username;
  var passkey=req.body.pass;
  var random=rand(160, 36);
  res.render('sample',{qs:req.query});
  var final=crypto.createHash('md5').update(passkey+random).digest("hex");
  var sql = "INSERT INTO login (username,salt,password) VALUES ("+"'"+username+"'"+","+"'"+random+"'"+","+"'"+final+"')";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});
app.listen(4000);
