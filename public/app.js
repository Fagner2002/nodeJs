async function insertData () {
    try {
        const response = await fetch('/insertData');
        const data = await response.json();
        alert(data.message);

        if (response.ok) {
        // Recarrega a página após uma resposta de sucesso
        window.location.reload();
        }
    } catch (error) {
        console.error("Erro:", error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const customerTable = document.getElementById("customerTable").getElementsByTagName('tbody')[0];

    fetch('/getCustomers')
        .then(response => response.json())
        .then(data => {
        data.forEach(customer => {
            const row = customerTable.insertRow();
            // row.insertCell().textContent = customer.id;
            row.insertCell().textContent = customer.name;
            row.insertCell().textContent = customer.address;
            row.insertCell().textContent = customer.status;

          // adicionando icone
          const trashCell = row.insertCell();
          const trashIcon = document.createElement('i');
          trashIcon.className = 'fa-solid fa-trash';
          trashIcon.id = 'tabelaId';

          trashIcon.addEventListener('click', async () => {
            try {
              const response = await fetch('/insertTeste');
              const data = await response.json();
              alert(data.message);
            } catch (error) {
              console.error("Erro:", error);
            }
          });
          trashCell.appendChild(trashIcon);
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

document.addEventListener("DOMContentLoaded", function() {
    const customerTable = document.getElementById("customerTable").getElementsByTagName('tbody')[0];
  
    // ...
  
    document.getElementById("insertButton").addEventListener("click", async (event) => {
      event.preventDefault(); // Impede o envio do formulário padrão
  
      const nameInput = document.querySelector('input[name="name"]');
      const addressInput = document.querySelector('input[name="address"]');
  
      const name = nameInput.value;
      const address = addressInput.value;
  
      if (name.trim() === "" || address.trim() === "") {
        alert("Por favor, preencha todos os campos.");
        return;
      }
  
      try {
        const response = await fetch('/insertData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `name=${encodeURIComponent(name)}&address=${encodeURIComponent(address)}`,
        });
  
        const data = await response.json();
        alert(data.message);
  
        if (response.ok) {
          window.location.reload();
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    });
});

// document.getElementById("tabelaId").addEventListener("click", async () => {
//   alert("Você clicou no botão");
// })