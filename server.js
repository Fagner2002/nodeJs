const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();

const con = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "123456",
  database: "mydb"
});

app.use(express.static(path.join(__dirname, 'public')));


app.post('/insertTeste', (req, res) => {
  console.log('entrou no servidor');
  res.json({ message: 'Requisição simples' });
});

app.get('/insertData', (req, res) => {
  const query = "INSERT INTO customers (name, address) VALUES ('teste', 'teste')";

  con.query(query, (err, result) => {
    if (err) {
      console.error("Erro ao inserir dados:", err);
      res.status(500).json({ message: "Erro ao inserir dados" });
    } else {
      console.log("Dados inseridos com sucesso!");
      res.json({ message: "Dados inseridos com sucesso!" });
    }
  });
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
