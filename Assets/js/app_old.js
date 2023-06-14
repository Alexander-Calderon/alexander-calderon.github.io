


$viewListar = document.getElementById("view-main__client");
$viewAgregar = document.getElementById("view__client--add");
$viewEditar = document.getElementById("view__client--edit");

// Default hidden views
$viewAgregar.classList.add("hidden");
$viewEditar.classList.add("hidden");

// Botones de Acción
$btnEditar = document.querySelector("#btnEditar");
$btnEliminar = document.querySelector("#btnEliminar");



$btnEditar.addEventListener("click", () => {
    $viewListar.classList.add("hidden");
    $viewAgregar.classList.add("hidden");
    $viewEditar.classList.remove("hidden");

    

})





const clientes = {
    data: [],
    nextId: 1,
    addCliente: function(titulo, genero, duracion) {
        console.log(this.data.length);
      this.nextId = this.data.length > 0 ? this.data[this.data.length - 1].id+1 : 1;
      const cliente = {
        // id: this.nextId++,  
        id: this.nextId,
        titulo: titulo,
        genero: genero,
        duracion: duracion
      };
      this.data.push(cliente);
    },
    deleteCliente: function(id) {
      this.data = this.data.filter((cliente) => cliente.id !== id);
    },
    getClienteById: function(id) {
      return this.data.find((cliente) => cliente.id === id);
    },
    updateCliente: function(id, titulo, genero, duracion) {
      const cliente = this.getClienteById(id);
      if (cliente) {
        cliente.titulo = titulo;
        cliente.genero = genero;
        cliente.duracion = duracion;
      }
    },
    getClientes: function() {
      return this.data;
    },
    buscarClientes: function(termino) {
      termino = termino.toLowerCase();
      return this.data.filter((cliente) => {
        return ( 
          cliente.titulo.toLowerCase().includes(termino) ||
          cliente.genero.toLowerCase().includes(termino) ||
          cliente.duracion.toLowerCase().includes(termino) )
      });
    }
  
  };




  

  
 
  
 
  

  
  

  

  

  
  mostrarClientes();
  