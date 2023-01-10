// Se crea la clase PRODUCTO con su constructor 

class Producto {
  constructor(id, descripcion, precio, images) {
    this.id = id;
    this.descripcion = descripcion;
    this.precio = precio;
    this.cantidad = 1;
    this.images = images;
  }
}

const almohadonAlaska = new Producto(
  1,
  "Almohadon Alaska",
  700,
  "../images/almohadon_alaska.jpeg"
);
const almohadonBari = new Producto(
  2,
  "Almohadon Bari",
  850,
  "../images/almohadon_bari.jpeg"
);
const almohadonesVenecia = new Producto(
  3,
  "Almohadones Venecia",
  1300,
  "../images/almohadones_venecia.jpeg"
);

const almohadonGrecia = new Producto(
  4,
  "Almohadon Grecia",
  500,
  "../images/almohadon_grecia.jpeg"
);
const almohadonMerida = new Producto(
  5,
  "Almohadon Merida",
  650,
  "../images/almohadon_merida.jpeg"
);
const almohadonTokio = new Producto(
  6,
  "Almohadon Tokio",
  600,
  "../images/almohadon_tokio.jpeg"
);
const mantaMalaga = new Producto(
  7,
  "Manta Malaga",
  900,
  "../images/manta_malaga.jpeg"
);
const mantaMilan = new Producto(
  8,
  "Manta Milan",
  750,
  "../images/manta_milan.jpeg"
);
const mantaRoma = new Producto(
  9,
  "Manta Roma",
  400,
  "../images/manta_roma.jpeg"
);
const mantaSiena = new Producto(
  10,
  "Manta Siena",
  550,
  "../images/manta_siena.jpeg"
);
const mantaBsas = new Producto(
  11,
  "Manta Buenos Aires",
  600,
  "../images/manta_bsas.jpeg"
);



//Creamos array de producto y lo pusheamos.

arrayProducto = [];

arrayProducto.push(almohadonAlaska);
arrayProducto.push(almohadonBari);
arrayProducto.push(almohadonesVenecia);
arrayProducto.push(almohadonGrecia);
arrayProducto.push(almohadonMerida);
arrayProducto.push(almohadonTokio);
arrayProducto.push(mantaMalaga);
arrayProducto.push(mantaMilan);
arrayProducto.push(mantaRoma);
arrayProducto.push(mantaSiena);
arrayProducto.push(mantaBsas);



//Creamos el array del Carrito de compras:

let carrito = [];


//Acceso al dom
const containerProductos = document.getElementById("containerProductos");

//Creamos funcion para mostrar productos. Recorre el arrayProducto y genera los divs y cards correspondientes con sus estilos de bootstrap.

const mostrarProductos = () => {
  arrayProducto.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add(
      "col-lg-4",
      "col-md-4",
      "col-sm-12",
      "d-flex",
      "justify-content-center"
    );
    card.innerHTML = `
                      <div class = "card card-mod">
                          <img src = "${producto.images}"  alt = " ${producto.descripcion}">
                          <div class ="card-body"> 
                              <h5> ${producto.descripcion} </h5>
                              <p> $ ${producto.precio} </p>
                              <div class ="containerBoton">
                              <button class= "btn btn-destacado" id = "botonMenos${producto.id}" >QUITAR</button>
                              <button class= "btn btn-destacado" id = "boton${producto.id}" >AGREGAR</button>
                              
                              </div>
                          </div>
                      </div>`;

    containerProductos.appendChild(card);



    //Agregar productos al carrito:

    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
      Toastify({
        text: "PRODUCTO AGREGADO",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "#af9274",
        },
      }).showToast();
    });

    const botonMenos = document.getElementById(`botonMenos${producto.id}`);

    botonMenos.addEventListener("click", () => {
      disminuirCantidad(producto.id);

    });
  });
};

//funcion para mostrar productos generados por js

mostrarProductos();


//Función agregar al carrito:

const agregarAlCarrito = (id) => {
  const productoEnCarrito = carrito.find((producto) => producto.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
    localStorage.setItem("carrito", JSON.stringify(carrito));
  } else {
    const producto = arrayProducto.find((producto) => producto.id === id);
    if (producto.eliminado) {
      producto.cantidad = 1;
      producto.eliminado = false;
    }
    carrito.push(producto);
    //Modificamos el localStorage:
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  calcularTotal();
};

//MOSTRAR EL CARRITO DE COMPRAS.

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");
verCarrito.addEventListener("click", () => {
  mostrarCarrito();
});

const mostrarCarrito = () => {
  // Primero obtenemos el carrito del almacenamiento local
  const carritoLocal = JSON.parse(localStorage.getItem("carrito")) || [];

  // Luego actualizamos el contenido del carrito
  contenedorCarrito.innerHTML = "";
  const tabla = document.createElement("table");
  tabla.classList.add("table", "table-striped");
  tabla.innerHTML = `
    <thead>
      <tr>
        <th scope="col">Producto</th>
        <th scope="col">Unidades</th>
        <th scope="col">Precio</th>
        <th scope="col">Subtotal</th>
      </tr>
    </thead>
    <tbody>
  `;

  carritoLocal.forEach((producto) => {
    if (producto.cantidad > 0) {
      const fila = document.createElement("tr");
      fila.innerHTML = `
      <td>${producto.descripcion}</td>
      <td>${producto.cantidad}</td>
      <td>${producto.precio}</td>
      <td>${producto.cantidad * producto.precio}</td>
    `;
      tabla.appendChild(fila);
    }
  });

  tabla.innerHTML += `
    </tbody>
    <tfoot>
      <tr>
        <th scope="col">Total</th>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col">${calcularTotal()}</th>
      </tr>
      <tr>
      
    </tr>
    </tfoot>
  `;

  contenedorCarrito.appendChild(tabla);

  //Si el carrito está vacio, deshabilita el boton de finalizar compra.

  if (carritoLocal.length === 0) {
    btnFinalizarCompra.removeAttribute("disabled");
  }
};


//Funcion para disminuir cantidad
const disminuirCantidad = (id) => {
  const productoEnCarrito = carrito.find((producto) => producto.id === id);
  if (productoEnCarrito && productoEnCarrito.cantidad > 0) {
    productoEnCarrito.cantidad--;
    Toastify({
      text: "UNIDAD ELIMINADA",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: {
        background: "#af9274",
      },
    }).showToast();
  } else {
    const producto = arrayProducto.find((producto) => producto.id === id);
    carrito.push(producto);
    //Modificamos el localStorage:
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  calcularTotal();
};


//Mostramos mensaje con el total de la compra:

const calcularTotal = () => {
  let totalCompra = 0;
  carrito.forEach((producto) => {
    totalCompra += producto.precio * producto.cantidad;
  });
  return totalCompra;
};


//funcion para finalizar compra al hacer click.

const btnFinalizarCompra = document.getElementById("finalizarCompra");

btnFinalizarCompra.addEventListener("click", () => {
  if (carrito.length === 0) {
    Swal.fire({
      title: "Error",
      text: "No hay productos en el carrito",
      icon: "error",
    });
    return;
  } else {
    console.log(carrito);
    Swal.fire({
      title: "¿Deseas finalizar la compra?",
      text: "Una vez finalizada, no podrás agregar ni eliminar productos del carrito",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ACEPTAR",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("COMPRA REALIZADA CON EXITO");
        // Deshabilitamos el botón "Finalizar compra" para evitar que se vuelva a hacer click
        btnFinalizarCompra.setAttribute("disabled", true);
        // Vaciamos el carrito
        carrito = [];
        // Actualizamos el almacenamiento local
        localStorage.setItem("carrito", JSON.stringify(carrito));
        // Ocultamos la tabla del carrito
        tabla.style.display = "none";
      }
    });
  }
});


//Función que elimina el producto del carrito:

function eliminarDelCarrito(id) {
  const producto = carrito.find((producto) => producto.id === id);
  const indice = carrito.indexOf(producto);
  carrito.splice(indice, 1);

  mostrarCarrito();

  //localStorage:
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

//VACIAMOS TODO EL CARRITO DE COMPRAS:

const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
  eliminarTodoElCarrito();
});

const eliminarTodoElCarrito = () => {
  carrito = [];

  // eliminamos la tabla de la página
  const tabla = contenedorCarrito.querySelector("table");
  contenedorCarrito.removeChild(tabla);

  //limpiamos el localStorage:
  localStorage.clear();
};