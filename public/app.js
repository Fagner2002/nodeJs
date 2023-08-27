document.addEventListener("DOMContentLoaded", function() {
    const customerTable = document.getElementById("customerTable").getElementsByTagName('tbody')[0];

    fetch('/getCustomers')
        .then(response => response.json())
        .then(data => {
        data.forEach(customer => {
            const row = customerTable.insertRow();
            row.insertCell().textContent = customer.name;
            row.insertCell().textContent = customer.address;
            row.insertCell().textContent = customer.id;
            row.insertCell().textContent = customer.status;
        });
        })
    .catch(error => console.error('Erro:', error));
});

document.getElementById("insertButton").addEventListener("click", async () => {
    try {
      const response = await fetch('/insertData');
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Erro:", error);
    }
});

document.getElementById("testeButton").addEventListener("click", async () => {
    try {
      const response = await fetch('http://localhost:8081/insertTeste', { 
        method: 'POST', // Defina o método para POST
      });
      const data = await response.json();
      alert(data.message);
      console.log(data);
    } catch (error) {
      console.error("Erro:", error);
    }
})