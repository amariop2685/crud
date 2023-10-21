console.log("Entro index.js");

let customers = JSON.parse(localStorage.getItem("customers")) || [];
// Estos son las referencias a mis inputs
const inputCustomer = document.getElementById("inputCustomer");
const inputStreet = document.getElementById("inputStreet");
const inputPhone = document.getElementById("inputPhone");
const inputEmail = document.getElementById("inputEmail");
const inputImagen = document.getElementById("inputImagen");
const inputIndustry = document.getElementById("inputIndustry");
const inputNameContact = document.getElementById("inputNameContact");
const inputDescription = document.getElementById("inputDescription");




// Estas son las referencias a mis botones
const btnAdd = document.getElementById("btnAdd");
const btnEraseAll = document.getElementById("btnEraseAll");

const divCustomers = document.getElementById("divCustomers");
const alertNoCustomers = document.getElementById("alertNoCustomers");

let indexEdit = null;

class Customer {
    constructor(nameCustomer, street, phone, emailCustomer, imagen, industry, nameContact, description) {
        this.nameCustomer = nameCustomer;
        this.street = street;
        this.phone = phone;
        this.emailCustomer = emailCustomer;
        this.imagen = imagen;
        this.industry = industry;
        this.nameContact = nameContact;
        this.description = description;
    }
}


function saveCustomer() {
    let nameCustomer = inputCustomer.value;
    let street = inputStreet.value;
    let phone = inputPhone.value;
    let emailCustomer = inputEmail.value;
    let imagen = inputImagen.value;
    let industry = inputIndustry.value;
    let nameContact = inputNameContact.value;
    let description = inputDescription.value;

    let customer = new Customer(
        nameCustomer,
        street,
        phone,
        emailCustomer,
        imagen,
        industry,
        nameContact,
        description
    );
    console.log(customer);

    if (indexEdit === null) {
        console.log("Agregar Cliente");
        customers.push(customer);
    } else {
        customers[indexEdit] = customer;
        indexEdit = null;
        console.log("Editar Cliente");
    }
    cleanFormCustomers();
    localStorage.setItem("customers", JSON.stringify(customers))
    console.log("Entro funcion guardar cliente");
    showCustomers();
}

function eraseAll() {
    console.log("Entro a borrar todo");
    localStorage.clear();
    customers = [];
    showCustomers();
    alert("Se borrraron los clientes");
}

function editCustomer(index) {
    console.log("Entro editar cliente:" + index);
    let customerToEdit = customers[index];
    console.log(customerToEdit, "customerToEdit");
    inputCustomer.value = customerToEdit.nameCustomer;
    inputStreet.value = customerToEdit.street;
    inputPhone.value = customerToEdit.phone;
    inputEmail.value = customerToEdit.emailCustomer;
    inputImagen.value = customerToEdit.imagen;
    inputIndustry.value = customerToEdit.industry;
    inputNameContact.value = customerToEdit.nameContact;
    inputDescription.value = customerToEdit.description;
    indexEdit = index;
    // Reto: separa la funcionalidad de llenar el formulario a una funcion individual como lo hicimos con la de limpiarFormularioPeliculas
}

function deleteCustomer(index) {
    console.log("Entro eliminar cliente:" + index);
    customers.splice(index, 1);
    localStorage.setItem("customers",JSON.stringify(customers));
    showCustomers();
}

function showCustomers() {
    if (customers.length === 0) {
        divCustomers.innerHTML = `
        <div class="alert alert-primary" role="alert" id="alertNoCustomers">
            No hay clientes agregadas
        </div>`;
    } else {
        divCustomers.innerHTML = "";
        customers.forEach((customer, index) => {
            divCustomers.innerHTML += `
                <div class="card mb-3">
                   <div class="row g-0">
                      <div class="col-md-4">
                         <img src="${customer.imagen}" class="img-fluid rounded-start" alt="customer">
                      </div>
                      <div class="col-md-8">
                         <div class="card-body">
                            <h5 class="card-title">${customer.nameCustomer}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">${customer.street} - ${customer.phone}</h6>
                            <p class="card-text">${customer.nameContact}</p>
                            <p class="card-text">${customer.industry}</p>
                            <p class="card-text">${customer.description}</p>
                            <div class="row mb-2">
                               <div class="col">
                                  <button class="btn btn-warning w-100 mt-2" type="button" id="editar-${index}" onclick="editCustomer(${index})">Editar</button>
                               </div>
                               <div class="col">
                                  <button class="btn btn-danger w-100 mt-2" type="button" id="eliminar-${index}" onclick="deleteCustomer(${index})">Eliminar</button>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
            `;
        });
    }
}

function cleanFormCustomers() {
    inputCustomer.value = "";
    inputStreet.value = "";
    inputPhone.value = "";
    inputEmail.value = "";
    inputImagen.value = "";
    inputIndustry.value = "";
    inputNameContact.value = "";
    inputDescription.value = "";
}


btnAdd.addEventListener("click", saveCustomer);
btnEraseAll.addEventListener("click", eraseAll);

showCustomers(); 