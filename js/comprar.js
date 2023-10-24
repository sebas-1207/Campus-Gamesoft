const customers = [];

function comprarJuego() {
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellido").value;
    const identificacion = document.getElementById("identificacion").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("correo").value;
    const fechaNacimiento = document.getElementById("nacimiento").value;
    const nacionalidad = document.getElementById("nacionalidad").value;

    if (nombre && apellidos && identificacion && telefono && email && fechaNacimiento && nacionalidad) {
        const customer = {
            nombre,
            apellidos,
            identificacion,
            telefono,
            email,
            fechaNacimiento,
            nacionalidad,
        };

        customers.push(customer);
        updateCustomerList();
        closeModal();
    }
}

function updateCustomerList() {
    const customerList = document.getElementById("customerList");
    customerList.innerHTML = "";

    customers.forEach((customer, index) => {
        const row = customerList.insertRow();
        row.insertCell(0).textContent = index + 1;
        row.insertCell(1).textContent = customer.nombre;
        row.insertCell(2).textContent = customer.apellidos;
        row.insertCell(3).textContent = customer.identificacion;
        row.insertCell(4).textContent = customer.telefono;
        row.insertCell(5).textContent = customer.email;
        row.insertCell(6).textContent = customer.fechaNacimiento;
        row.insertCell(7).textContent = customer.nacionalidad;
        const actionsCell = row.insertCell(8);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.onclick = () => deleteCustomer(index);
        actionsCell.appendChild(deleteButton);
    });
}

function deleteCustomer(index) {
    customers.splice(index, 1);
    updateCustomerList();
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}