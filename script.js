// PRODUCTOS BASE
const products = [
  { id: 1, name: "Caja Rosada", price: 8990, category: "cajas" },
  { id: 2, name: "Lucky Game Mini", price: 4990, category: "lucky" },
  { id: 3, name: "Pulsera Cute", price: 2990, category: "accesorios" },
  { id: 4, name: "HQ Beads Llavero", price: 3990, category: "hqb" }
];

const productList = document.getElementById("product-list");
const cartBtn = document.getElementById("cart-btn");
const cartPanel = document.getElementById("cart-panel");
const closeCart = document.getElementById("close-cart");
const overlay = document.getElementById("overlay");

let cart = [];

// Mostrar productos
function renderProducts(filter = "all") {
  productList.innerHTML = "";

  products
    .filter(p => filter === "all" || p.category === filter)
    .forEach(p => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <h4>${p.name}</h4>
        <p>$${p.price}</p>
        <button onclick="addToCart(${p.id})">Agregar</button>
      `;
      productList.appendChild(div);
    });
}

renderProducts();

// Función agregar al carrito
function addToCart(id) {
  cart.push(products.find(p => p.id === id));
  updateCart();
}

// Actualizar carrito
function updateCart() {
  document.getElementById("cart-count").textContent = cart.length;
  document.getElementById("cart-items-count").textContent = cart.length;

  const itemsDiv = document.getElementById("cart-items");
  itemsDiv.innerHTML = "";

  let total = 0;

  cart.forEach((p, i) => {
    total += p.price;
    itemsDiv.innerHTML += `
      <div class="cart-row">
        <span>${p.name}</span>
        <button onclick="removeItem(${i})">Eliminar</button>
      </div>
    `;
  });

  document.getElementById("cart-total").textContent = "$" + total;
}

// Eliminar producto
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// Abrir carrito
cartBtn.onclick = () => {
  cartPanel.classList.add("show");
  overlay.classList.add("show");
};

// Cerrar carrito
closeCart.onclick = () => {
  cartPanel.classList.remove("show");
  overlay.classList.remove("show");
};

overlay.onclick = () => closeCart();

// Categorías
document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.onclick = () => renderProducts(btn.dataset.category);
});
