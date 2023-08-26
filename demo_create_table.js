var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "123456",
  database: "mydb"
});

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//     });
//   });

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table altered");
    });
});