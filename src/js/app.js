const url = "http://localhost:5000/products";

let productos;

const obtenerDatos = async () => {
  try {
    const res = await fetch(url);
    const data = await res.json();

    productos = data;
    // console.log(productos);

    cargarProductos(data);
    cargaFiltroColores(data);
    cargaFiltroTallas(data);
  } catch (error) {
    console.log(error);
  }
};

const productoCard = document.querySelector("#producto");
const filtroColor = document.querySelector("#filtroColor");
const filtroTalla = document.querySelector("#filtroTalla");
const bodyContainer = document.querySelector(".body-container");

bodyContainer.addEventListener("click", (e) => {
  agregarCarrito(e);
  filterColor(e);
  filterSize(e);
  filterPrice(e);
});

export function cargarProductos(productos) {
  productos.forEach((producto) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("producto");
    cardDiv.classList.add(`${producto.color}`);
    cardDiv.id = producto.id;
    cardDiv.setAttribute("color", `${producto.color}`);

    const imgProduct = document.createElement("img");
    imgProduct.src = producto.image;

    const titleProduct = document.createElement("p");
    titleProduct.classList.add("title-product");
    titleProduct.textContent = producto.name.toUpperCase();

    const priceProduct = document.createElement("p");
    priceProduct.classList.add("price-product");
    priceProduct.textContent = `R$ ${producto.price}`;

    const cuotasProduct = document.createElement("p");
    cuotasProduct.classList.add("cuotas-product");
    cuotasProduct.textContent = `até ${producto.parcelamento[0]} de R$ ${producto.parcelamento[1]}`;

    const buttonProduct = document.createElement("button");
    buttonProduct.id = producto.id;
    buttonProduct.classList.add("btn");
    buttonProduct.textContent = "COMPRAR";

    cardDiv.appendChild(imgProduct);
    cardDiv.appendChild(titleProduct);
    cardDiv.appendChild(priceProduct);
    cardDiv.appendChild(cuotasProduct);
    cardDiv.appendChild(buttonProduct);
    productoCard.appendChild(cardDiv);
  });
}

function cargaFiltroColores(productos) {
  productos.forEach((producto) => {
    const color = producto.color;
    const colorProduct = document.createElement("li");
    colorProduct.id = color;
    colorProduct.innerHTML = `<input class="check" type="checkbox"  id="${color}"/> ${color}`;

    const classFiltroColor = document.getElementById(`${color}`);

    if (!classFiltroColor) {
      filtroColor.appendChild(colorProduct);
    }
  });
}

function cargaFiltroTallas(productos) {
  productos.forEach((producto) => {
    const talla = producto.size;
    talla.forEach((talla) => {
      const tallaFiltro = document.createElement("div");
      tallaFiltro.classList.add("talla");
      tallaFiltro.id = talla;
      tallaFiltro.textContent = talla;

      const classTalla = document.getElementById(`${talla}`);

      if (!classTalla) {
        filtroTalla.appendChild(tallaFiltro);
      }
    });
  });
}

addEventListener("DOMContentLoaded", obtenerDatos);

function agregarCarrito(e) {
  if (e.target.classList.contains("btn")) {
    console.log("boton Comprar ID: ", e.target.id);
  }
}

function filterColor(e) {
  if (e.target.classList.contains("check")) {
    // console.log("filtra por color: ", e.target.id);
    const resFilterColor = productos.filter(() => {
      if (e.target.id) {
        console.log('paso por primer if');
        console.log(productos.color);
        return productos.color === e.target.id;
      }
      console.log('retorna producto');
      return productos;
    });

    console.log(productos);
  }
}

// function colorFilter(color) {}

function filterSize(e) {
  if (e.target.classList.contains("talla")) {
    console.log("filtra por talla: ", e.target.id);
  }
}

function filterPrice(e) {
  if (e.target.classList.contains("price")) {
    console.log("filtra por precio: ", e.target.id);
  }
}
