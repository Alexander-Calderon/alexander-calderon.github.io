

// CLASE LITERAL CLIENTES
const clientes = {
    data: [],
    nextId: 1,
    addCliente: function( identificacion, nombres, apellidos, telefono, email, fecha_nacimiento, nacionalidad ) {
        console.log(this.data.length);
      this.nextId = this.data.length > 0 ? this.data[this.data.length - 1].id+1 : 1;

      const cliente = {
        // id: this.nextId++,
        id: this.nextId,
        identificacion: identificacion,
        nombres: nombres,
        apellidos: apellidos,
        telefono: telefono,
        email: email,
        fecha_nacimiento: fecha_nacimiento,
        nacionalidad: nacionalidad
      };
      this.data.push(cliente);
    },

    deleteCliente: function(id) {
      this.data = this.data.filter((cliente) => cliente.id !== id);
    },

    getClienteById: function(id) {
      return this.data.find((cliente) => cliente.id === id);
    },

    updateCliente: function(id, identificacion, nombres, apellidos, telefono, email, fecha_nacimiento, nacionalidad) {
        const cliente = this.getClienteById(id);
        console.log("cliente");
        console.log( cliente );
        if (cliente) {
            cliente.identificacion = identificacion;
            cliente.nombres = nombres;
            cliente.apellidos = apellidos;
            cliente.telefono = telefono;
            cliente.email = email;
            cliente.fecha_nacimiento = fecha_nacimiento;
            cliente.nacionalidad = nacionalidad;
        }
    },

    getClientes: function() {
        return this.data;
    },

    buscarClientes: function( targetWord ) {
        targetWord =  targetWord.toLowerCase();
        return this.data.filter((cliente) => {
            return ( 
                cliente.nombres.toLowerCase().includes( targetWord) ||
                cliente.apellidos.toLowerCase().includes( targetWord)  ||
                cliente.identificacion.toLowerCase().includes( targetWord) )
        });
    }

};



 // datos quemados:
// Agregar clientes de ejemplo al objeto clientes
clientes.addCliente('1234567891', 'Roy', 'Barreras', '3176543211', 'Roy@example.fake', '2000-01-30', "Colombiana");
clientes.addCliente('1234567892', 'Carlos', 'Forero', '3176543212', 'Carlos@example.fake', '2000-01-29', "Colombiana");
clientes.addCliente('1234567893', 'Alma', 'Rico', '3176543213', 'Alma@example.fake', '2000-01-28', "Colombiana");



function mostrarClientes() {
    const clientesHTML = clientes.getClientes().map((cliente) => {
        return ` 
        <tr data-id="${cliente.id}">
            <td>
                <div class="d-flex align-items-center">
                    <div class="ms-3">
                        <p class="fw-bold mb-1">${cliente.identificacion}</p>
                    </div>
                </div>
            </td>
            <td>
                <p class="fw-normal mb-1">${cliente.nombres} ${cliente.apellidos}</p>
                <p class="text-muted mb-0">${cliente.fecha_nacimiento}</p> <!-- Y-m-d -->

            </td>
            <td>
                <p class="fw-normal mb-1">${cliente.telefono}</p>
                <p class="text-muted mb-0">${cliente.email}</p>
            </td>
            <td>
                <span class="badge badge-success rounded-pill d-inline">${cliente.nacionalidad}</span>
            </td>
            <td>
                <button id="btnEditar" type="button" class="btn btn-warning btn-floating btnEditar">
                    <i class="fa-solid fa-pen-to-square btnEditar"></i>
                </button>
                <button id="btnEliminar" type="button" class="btn btn-danger btn-floating btnEliminar">
                    <i id="btnEliminar-content" class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    }).join('');

    document.getElementById('client_table--body').innerHTML = clientesHTML;
}





// Métodos de control de Vistas, default y onclick:

// Default hidden views
// $viewListar = document.getElementById("view-main__client").classList.add("hidden");
$viewAgregar = document.getElementById("view__client--add").classList.add("hidden");
$viewEditar = document.getElementById("view__client--edit").classList.add("hidden");


function mostrarAgregarVista() {
    document.getElementById('view-main__client').classList.add('hidden');
    document.getElementById('view__client--edit').classList.add('hidden');
    document.getElementById('view__client--add').classList.remove('hidden');
}

function mostrarEditarVista(id) {
    const cliente = clientes.getClienteById(id);
    if (cliente) {
        document.getElementById('editclient__input--ID').value = id;
        document.getElementById('editclient__input--identificacion').value = cliente.identificacion;
        document.getElementById('editclient__input--nombre').value = cliente.nombres;
        document.getElementById('editclient__input--apellido').value = cliente.apellidos;
        document.getElementById('editclient__input--telefono').value = cliente.telefono;
        document.getElementById('editclient__input--email').value = cliente.email;
        document.getElementById('editclient__input--nacimiento').value = cliente.fecha_nacimiento;
        document.getElementById('editclient__input--nacionalidad').value = cliente.nacionalidad;

        // document.getElementById('editclient__input--identificacion').focus.apply = true; //por mejorar focus


        document.getElementById('view-main__client').classList.add('hidden');
        document.getElementById('view__client--edit').classList.remove('hidden');
    }
}

function mostrarVistaCliente(){
    document.getElementById('view-main__client').classList.remove('hidden');
    document.getElementById('view__client--add').classList.add('hidden');
    document.getElementById('view__client--edit').classList.add('hidden');
}

// FIN Métodos de control de Vistas.


// ##INICIO Triggers de botones##

// Accionar para guardar
document.getElementById('btnAgregar').addEventListener('click', mostrarAgregarVista);

// Accionar para botones de Editar y Eliminar
document.getElementById('client_table--body').addEventListener('click', (event) => {
    // console.log("ok1");
    // console.log(event);
    
    // if (event.target.classList.contains('btnEliminar')) {
    if ( event.target.matches('#btnEliminar') || event.target.matches('#btnEliminar-content') ) { //fixed font-awesome f* click
        
        // console.log("ok2");
        const fila = event.target.closest('tr');
        const id = parseInt(fila.getAttribute('data-id'));

        clientes.deleteCliente(id);
        fila.remove();
    } else if (event.target.classList.contains('btnEditar')) {
        const fila = event.target.closest('tr');
        const id = parseInt(fila.getAttribute('data-id'));

        mostrarEditarVista(id);
    }
});


// ##FIN Triggers de botones##


// ## CRUD base
//Guardar nuevo cliente
document.getElementById('confirmarAgregarCliente').addEventListener('click', () => {


    const identificacion = document.getElementById('addclient__input--identificacion').value
    const nombres = document.getElementById('addclient__input--nombre').value
    const apellidos = document.getElementById('addclient__input--apellido').value
    const telefono = document.getElementById('addclient__input--telefono').value
    const email = document.getElementById('addclient__input--email').value
    const fecha_nacimiento = document.getElementById('addclient__input--nacimiento').value
    const nacionalidad = document.getElementById('addclient__input--nacionalidad').value

    console.log("aceptado");
    clientes.addCliente(identificacion, nombres, apellidos, telefono, email, fecha_nacimiento, nacionalidad);
    console.log(clientes.data);
    mostrarClientes();
    cancelarEdicion();
});

//Editar cliente
document.getElementById('confirmarEditarCliente').addEventListener('click', (event) => {
    // const fila = event.target.closest('tr');
    // const id = parseInt(fila.getAttribute('data-id'));
    // const id = parseInt(document.getElementById('editarIdInput').value);
    
    const id = parseInt( document.getElementById('editclient__input--ID').value );
    console.log( "El id es:" );
    console.log( id );
    const identificacion = document.getElementById('editclient__input--identificacion').value
    const nombres = document.getElementById('editclient__input--nombre').value
    const apellidos = document.getElementById('editclient__input--apellido').value
    const telefono = document.getElementById('editclient__input--telefono').value
    const email = document.getElementById('editclient__input--email').value
    const fecha_nacimiento = document.getElementById('editclient__input--nacimiento').value
    const nacionalidad = document.getElementById('editclient__input--nacionalidad').value

    clientes.updateCliente(id, identificacion, nombres, apellidos, telefono, email, fecha_nacimiento, nacionalidad);
    console.log(clientes.data)
    mostrarClientes();
    cancelarEdicion();
});


function cancelarEdicion() {
    document.getElementById('view-main__client').classList.remove('hidden');
    document.getElementById('view__client--add').classList.add('hidden');
    document.getElementById('view__client--edit').classList.add('hidden');
    
    document.getElementById('addclient__input--identificacion').value = '';
    document.getElementById('addclient__input--nombre').value = '';
    document.getElementById('addclient__input--apellido').value = '';
    document.getElementById('addclient__input--telefono').value = '';
    document.getElementById('addclient__input--email').value = '';
    document.getElementById('addclient__input--nacimiento').value = '';
    document.getElementById('addclient__input--nacionalidad').value = '';
    
    document.getElementById('editclient__input--identificacion').value = '';
    document.getElementById('editclient__input--nombre').value = '';
    document.getElementById('editclient__input--apellido').value = '';
    document.getElementById('editclient__input--telefono').value = '';
    document.getElementById('editclient__input--email').value = '';
    document.getElementById('editclient__input--nacimiento').value = '';
    document.getElementById('editclient__input--nacionalidad').value = '';

}

document.getElementById('cancelarAgregarCliente').addEventListener('click', cancelarEdicion);
document.getElementById('cancelarEditarCliente').addEventListener('click', cancelarEdicion);


mostrarClientes();


// BUSQUEDA:

// Obtener elemento del DOM
const buscarInput = document.getElementById('inputBuscarCliente');

// Evento para buscar clientes cuando se ingresa texto en el cuadro de búsqueda
buscarInput.addEventListener('input', (event) => {
    const termino = event.target.value.trim();
    filtrarClientes(termino); //término a buscar
});

// Función para filtrar las clientes y actualizar la tabla
function filtrarClientes(termino) {
    console.log("object");
    const clientesFiltradas = clientes.buscarClientes(termino);
    mostrarClientesFiltradas(clientesFiltradas);
}

function mostrarClientesFiltradas(clientesFiltradas) {
    const clientesHTML = clientesFiltradas.map((cliente) => {
        return `
        <tr data-id="${cliente.id}">
            <td>
                <div class="d-flex align-items-center">
                    <div class="ms-3">
                        <p class="fw-bold mb-1">${cliente.identificacion}</p>
                    </div>
                </div>
            </td>
            <td>
                <p class="fw-normal mb-1">${cliente.nombres} ${cliente.apellidos}</p>
                <p class="text-muted mb-0">${cliente.fecha_nacimiento}</p> <!-- Y-m-d -->

            </td>
            <td>
                <p class="fw-normal mb-1">${cliente.telefono}</p>
                <p class="text-muted mb-0">${cliente.email}</p>
            </td>
            <td>
                <span class="badge badge-success rounded-pill d-inline">${cliente.nacionalidad}</span>
            </td>
            <td>
                <button id="btnEditar" type="button" class="btn btn-warning btn-floating btnEditar">
                    <i class="fa-solid fa-pen-to-square btnEditar"></i>
                </button>
                <button id="btnEliminar" type="button" class="btn btn-danger btn-floating btnEliminar">
                    <i id="btnEliminar-content" class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    }).join('');

    document.getElementById('client_table--body').innerHTML = clientesHTML;
}


// FIN BUSQUEDA


// MODULO GESTION VIDEOJUEGOS


// CLASE LITERAL JUEGOS
const games = {
    data: [],
    nextId: 1,
    addGame: function( nombre, valorLicencia, pFidelizacion, tematica ) {
        console.log(this.data.length);
      this.nextId = this.data.length > 0 ? this.data[this.data.length - 1].id+1 : 1;

      const game = {
        // id: this.nextId++,
        id: this.nextId,
        nombre: nombre,
        valorLicencia: valorLicencia,
        pFidelizacion: pFidelizacion,
        tematica: tematica
      };
      this.data.push(game);
    },
    getGames: function() {
        return this.data;
    },

    deleteGame: function(id) {
      this.data = this.data.filter((game) => game.id !== id);
    }

};

document.getElementById('confirmarAgregarJuego').addEventListener('click', () => {


    const nombre = document.getElementById('addGame__input--nombre').value
    const valorLicencia = document.getElementById('addGame__input--valorLicencia').value
    const pFidelizacion = document.getElementById('addGame__input--pFidelizacion').value
    const tematica = document.getElementById('editclient__input--tematica').value
    
    console.log("aceptado");
    games.addGame( nombre, valorLicencia, pFidelizacion, tematica );
    console.log(games.data);
    mostrarGames();
});


function mostrarGames() {
    const gamesHTML = games.getGames().map((game) => {
        return `         
        
        <div class="col-lg-4 col-md-6 col-12 mb-4 mb-sm-5">                            
            <div class="card" style="width: 18rem;">
                <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/062.webp" class="card-img-top" alt="Chicago Skyscrapers"/>
                <div class="card-body">
                    <h5 class="card-title">${game.nombre}</h5>                                  
                </div>
                <ul class="list-group list-group-light list-group-small">
                    <li class="list-group-item px-4">${game.valorLicencia}</li>
                    <li class="list-group-item px-4">${game.pFidelizacion}</li>
                    <li class="list-group-item px-4">${game.tematica}</li>
                </ul>
                </div>

        </div>

        `;
    }).join('');
    
    document.getElementById('game--body').innerHTML = gamesHTML;
    }
    