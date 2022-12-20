//Creamos clase Producto

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

//Creamos funcion para mostrar productos. Recorre el arrayProducto y genera los divs y cards correspondientes con sus estilos.

const containerProductos = document.getElementById("containerProductos");

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
                              <button class= "btn btn-destacado" id = "boton${producto.id}" >AGREGAR</button>
                              </div>
                          </div>
                      </div>`;

    containerProductos.appendChild(card);

    //Agregar productos al carrito:

    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });
  });
};

//Función agregar al carrito:

const agregarAlCarrito = (id) => {
  const productoEnCarrito = carrito.find((producto) => producto.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    const producto = arrayProducto.find((producto) => producto.id === id);
    carrito.push(producto);
    //Trabajamos con el localStorage:
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  calcularTotal();
};

mostrarProductos();

//MOSTRAR EL CARRITO DE COMPRAS.

const contenedorCarrito = document.getElementById("contenedorCarrito");

const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
  mostrarCarrito();
});

//Función para mostar el carrillllooo:

const mostrarCarrito = () => {
  contenedorCarrito.innerHTML = "";

  carrito.forEach((producto) => {
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
                              <p> ${producto.precio} </p>
                              <p> ${producto.cantidad} UNIDAD </p>
                              <div class ="containerBoton">
                              <button class= "btn btn-destacado" id ="eliminar${producto.id}" >Eliminar producto</button>
                              </div>
                          </div> 
                      </div>`;

    contenedorCarrito.appendChild(card);

    //Eliminar productos del carrito:

    const boton = document.getElementById(`eliminar${producto.id}`);
    boton.addEventListener("click", () => {
      eliminarDelCarrito(producto.id);
    });
  });
  calcularTotal();
};

//Función que elimina el producto del carrito:

const eliminarDelCarrito = (id) => {
  const producto = carrito.find((producto) => producto.id === id);
  const indice = carrito.indexOf(producto);
  carrito.splice(indice, 1);

  mostrarCarrito();

  //localStorage:
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

//VACIAMOS TODO EL CARRITO DE COMPRAS:

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
  eliminarTodoElCarrito();
});

const eliminarTodoElCarrito = () => {
  carrito = [];
  mostrarCarrito();

  //localStorage:
  localStorage.clear();
};

//Mostramos mensaje con el total de la compra:

const total = document.getElementById("total");

const calcularTotal = () => {
  let totalCompra = 0;
  carrito.forEach((producto) => {
    totalCompra += producto.precio * producto.cantidad;
  });
  total.innerHTML = `: $${totalCompra}`;
};
