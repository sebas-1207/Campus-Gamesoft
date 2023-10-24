const customerList = document.getElementById("customerList");
const addCustomerButton = document.getElementById("addCustomerButton");
const customers = loadCustomersFromLocalStorage() || [];

addCustomerButton.addEventListener("click", addNewCustomer);

function addNewCustomer() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const identificacion = document.getElementById("identificacion").value;
    const telefono = document.getElementById("telefono").value;
    const correo = document.getElementById("correo").value;
    const nacimiento = document.getElementById("nacimiento").value;
    const nacionalidad = document.getElementById("nacionalidad").value;

    const customer = {
        identificacion: identificacion,
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        correo: correo,
        nacimiento: nacimiento,
        nacionalidad: nacionalidad,
    };

    customers.push(customer);
    saveCustomersToLocalStorage(customers);
    updateTable();
    clearForm();

    const modal = new bootstrap.Modal(document.getElementById("modal-addCliente"));
    modal.hide();
}

function updateTable() {
    customerList.innerHTML = "";

    for (let i = 0; i < customers.length; i++) {
        const customer = customers[i];

        const newRow = customerList.insertRow();
        newRow.insertCell(0).innerText = i + 1;
        newRow.insertCell(1).innerText = customer.identificacion;
        newRow.insertCell(2).innerText = customer.nombre;
        newRow.insertCell(3).innerText = customer.apellido;
        newRow.insertCell(4).innerText = customer.telefono;
        newRow.insertCell(5).innerText = customer.correo;
        newRow.insertCell(6).innerText = customer.nacimiento;
        newRow.insertCell(7).innerText = customer.nacionalidad;

        const actionsCell = newRow.insertCell(8);
        actionsCell.innerHTML = `
            <button class="btn btn-info" onclick="editCustomer(${i})">Editar</button>
            <button class="btn btn-danger" onclick="deleteCustomer(${i})">Eliminar</button>
        `;
    }
}

function clearForm() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("identificacion").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("nacimiento").value = "";
    document.getElementById("nacionalidad").value = "";
}

function deleteCustomer(index) {
    customers.splice(index, 1);
    saveCustomersToLocalStorage(customers);
    updateTable();
}

function editCustomer(index) {
    const customerToEdit = customers[index];
    document.getElementById("nombre").value = customerToEdit.nombre;
    document.getElementById("apellido").value = customerToEdit.apellido;
    document.getElementById("identificacion").value = customerToEdit.identificacion;
    document.getElementById("telefono").value = customerToEdit.telefono;
    document.getElementById("correo").value = customerToEdit.correo;
    document.getElementById("nacimiento").value = customerToEdit.nacimiento;
    document.getElementById("nacionalidad").value = customerToEdit.nacionalidad;

    addCustomerButton.innerText = "Guardar Cambios";
    addCustomerButton.removeEventListener("click", addNewCustomer);

    addCustomerButton.addEventListener("click", function () {
        customerToEdit.nombre = document.getElementById("nombre").value;
        customerToEdit.apellido = document.getElementById("apellido").value;
        customerToEdit.identificacion = document.getElementById("identificacion").value;
        customerToEdit.telefono = document.getElementById("telefono").value;
        customerToEdit.correo = document.getElementById("correo").value;
        customerToEdit.nacimiento = document.getElementById("nacimiento").value;
        customerToEdit.nacionalidad = document.getElementById("nacionalidad").value;

        saveCustomersToLocalStorage(customers);
        updateTable();
        clearForm();

        addCustomerButton.innerText = "Agregar Cliente";
        addCustomerButton.removeEventListener("click", addCustomerButton);
        addCustomerButton.addEventListener("click", addNewCustomer);

        const modal = new bootstrap.Modal(document.getElementById("modal-addCliente"));
        modal.hide();
    });

    const modal = new bootstrap.Modal(document.getElementById("modal-addCliente"));
    modal.show();
}

function saveCustomersToLocalStorage(customers) {
    localStorage.setItem("customers", JSON.stringify(customers));
}

function loadCustomersFromLocalStorage() {
    const customersJSON = localStorage.getItem("customers");
    return JSON.parse(customersJSON);
}