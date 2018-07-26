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
app.post('/', urlencodedParser, function (req, res) {
  var username=req.body.username;
  var passkey=req.body.pass;
  console.log(username);
  console.log("pass="+passkey);
  var sql = "SELECT * FROM login WHERE username = "+"'"+username+"'";
  connection.query(sql, function (err, results,fields) {
    if (err)
    throw err;
    console.log(results);
    var salt="";
    var password="";
    try {
      salt=results[0].salt;
     console.log(salt);
     password=results[0].password;
   }
    catch (err) {
  // Handle the error here.
  console.log("no match");
  }
  var final=crypto.createHash('md5').update(passkey+salt).digest("hex");
  console.log(final);
  if(final===password)
  res.render("2nd_page");
  res.render("404");
});
});
console.log('port 4000');
app.listen(4000);
