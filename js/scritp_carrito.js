//Mensaje

const btnCart = document.querySelector(".container-cart-icon");
const containerCartProducts = document.querySelector(
  ".container-cart-products"
);

//Botón que aparece o desaparece el carrtio de compra y de los productos comprados
btnCart.addEventListener("click", () => {
  containerCartProducts.classList.toggle("hidden-cart");
});

//Información especifica del producto


const cartInfo = document.querySelector(".cart-product");
const rowProduct = document.querySelector(".row-product");
const productList = document.querySelector(".container-items");


//Variable del listado del todo los productos.

let allProducts = [];
let valorTotal = document.querySelector(".total-pagar");
const countProducts = document.querySelector("#contador-productos");


//Evento Click que va agregando y realizando las operaciones de adición del producto escogido.

productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-add-cart")) {
    const product = e.target.parentElement;
    const infoProduct = {
      quantity: 1,
      title: product.querySelector("h2").textContent,
      price: product.querySelector("p").textContent,
    };

    const existentes = allProducts.some(
      (product) => product.title === infoProduct.title
    );

    if (existentes) {
      const products = allProducts.map((product) => {
        if (product.title === infoProduct.title) {
          product.quantity++;
          return product;
        } else {
          return product;
        }
      });

      allProducts = [...products];
    } else {
      allProducts = [...allProducts, infoProduct];
    }

    showHTML();
    Toastify({

      text: "Producto agregado",
  
  }).showToast();

  }
});

// Evento que elimina el producto, en caso de que no desea comprar.
rowProduct.addEventListener("click", (e) => {
  if (e.target.classList.contains("icon-close")) {
    const product = e.target.parentElement;
    const title = product.querySelector("p").textContent;

    allProducts = allProducts.filter((product) => product.title !== title);

    console.log(allProducts);
    showHTML();
    Toastify({

      text: "Producto eliminado",
  
  }).showToast();
  }
});

//Función para mostrar en el HTML en la página web

const showHTML = () => {
  if (!allProducts.length) {
    containerCartProducts.innerHTML = `<p class= "cart-empty"> El carrito está vacío </p>`;
  }

  //Limpiar HTML
  rowProduct.innerHTML = "";

  let totalPagar = 0;
  let totalProductos = 0;

  allProducts.forEach((product) => {
    const containerProduct = document.createElement("div");
    containerProduct.classList.add("cart-product");

    containerProduct.innerHTML = `
        
        <div class="info-cart-product">
        <span class="cantidad-producto-carrito">${product.quantity}</span>
        <p class="titulo-producto-carrito">${product.title}</p>
        <span class="precio-producto-carrito">${product.price}</span>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="icon-close"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>

        `;

    rowProduct.append(containerProduct);
    totalPagar =
      totalPagar + parseInt(product.quantity * product.price.slice(1));
    totalProductos = totalProductos + product.quantity;
  });

  valorTotal.innerText = `$${totalPagar}`;
  countProducts.innerText = totalProductos;
};
