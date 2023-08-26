var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "123456",
    database: "mydb"
});

con.connect(function(err) {
    if (err) throw err;
    var sql = "INSERT INTO customers (name, address) VALUES ('Michelle', 'Blue Village 1')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted, ID: " + result.insertId);
    });
});