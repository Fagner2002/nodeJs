var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "123456"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
