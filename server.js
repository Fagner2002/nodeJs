const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const { read, copyFileSync } = require('fs');

const app = express();

const con = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "123456",
  database: "mydb"
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function printAndHang(message) {
  console.log(message);

  while (true) {}
}

app.post('/insertData', (req, res) => {
  const userName = req.body.name
  const address  = req.body.address

  const query = "INSERT INTO customers (name, address) VALUES (?, ?)";
  con.query(query, [userName, address], (err, result) => {
    if (err) {
      console.error("Erro ao inserir dados:", err);
      res.status(500).json({ message: "Erro ao inserir dados" });
    } else {
      console.log("Dados inseridos com sucesso!");
      res.json({ message: "Dados inseridos com sucesso!" });
    }
  });
});

app.get('/getCustomers', (req, res) => {
  const query = "SELECT c.name, c.address, c.id, c.status FROM customers c";

  con.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao buscar dados:", err);
      res.status(500).json({ message: "Erro ao buscar dados" });
    } else {
      res.json(results);
    }
  });
});

app.post('/insertTeste', (req, res) => {
  console.log('entrou no servidor');
  res.json({ message: 'Requisição simples' });
});

app.get('/insertData', (req, res) => {
  const query = "INSERT INTO customers (name, address) VALUES ('Mudando', 'Mudando')";

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

app.post('/excluirPessoa', (req, res) => {
  console.log('Oi')
  const { customerId } = req.body;
  
  // Consulta SQL de atulização
  // const query = updateQuery = `UPDATE customers SET customers.status WHERE id = ?`;
  const updateQuery = `UPDATE customers SET customers.status = 1 WHERE customers.id = ?`;

  // Execução da consulta
  con.query(updateQuery, [customerId], (err, results) => {
    if (err) {
      console.error('Erro ao atualizar o cliente', err);
    } else {
      console.log('Cliente atulizado com sucesso.');
    }

    // Encerrar a conexão após a conclusão da consulta
  });
  const response = {
    message: `Cliente com ID ${customerId} excluído com sucesso.`
  };

  res.json(response);
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
