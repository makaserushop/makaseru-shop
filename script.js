// Makaseru Shop - script.js

// Productos (puedes agregar más cuando quieras)
const products = [
  { id: 1, name: "Caja de regalo cute", price: 5990, img: "https://i.imgur.com/2yaf2vZ.png" },
  { id: 2, name: "Set girly pastel", price: 7990, img: "https://i.imgur.com/QgXJZyM.png" },
  { id: 3, name: "Peluchito kawaii", price: 6990, img: "https://i.imgur.com/si1s8Jw.png" },
];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
let cart = [];

// Mostrar productos
toProductCard = (p) => `
  <div class="product">
    <img src="${p.img}" style="width:100%; border-radius:15px;" />
    <h3>${p.name}</h3>
    <p>$${p.price}</p>
    <button onclick="addToCart(${p.id})">Agregar al carrito</button>
  </div>
`;

productList.innerHTML = products.map(toProductCard).join("");

// Agregar al carrito
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  cart.push(product);
  updateCart();
}

// Mostrar carrito
function updateCart() {
  cartItems.innerHTML = cart
    .map((p, i) => `
      <div>
        ${p.name} — $${p.price}
        <button onclick="removeFromCart(${i})" style="margin-left:10px; background:#ff4f4f">X</button>
      </div>
    `)
    .join("");

  const total = cart.reduce((sum, p) => sum + p.price, 0);
  cartTotal.textContent = `Total: $${total}`;
}

// Eliminar productounction removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Simulación de pago
const checkoutBtn = document.getElementById("checkout-btn");
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Tu carrito está vacío 🛒");
    return;
  }
  alert("Aquí irá el pago real (PayPal / WebPay / Tarjeta). Por ahora es una demo ✨");
});
<script>
const products = [
{ id: 1, name: "Caja Sorpresa Premium", price: 14990, image: "caja-premium.jpg", category: "cajas" },
{ id: 2, name: "Lucky Game - Mini", price: 2990, image: "lucky-mini.jpg", category: "lucky" },
{ id: 3, name: "Pulsera Cute", price: 3990, image: "pulsera-cute.jpg", category: "accesorios" },
{ id: 4, name: "Llavero HQ Beads", price: 4990, image: "hqbeads-llavero.jpg", category: "hqb" }
];


document.querySelectorAll(".cat-btn").forEach(btn => {
btn.addEventListener("click", () => {
const categoria = btn.dataset.category;
mostrarProductos(categoria);
});
});


function mostrarProductos(categoria = "all") {
const contenedor = document.getElementById("product-list");
contenedor.innerHTML = "";


const filtrados = categoria === "all" ? products : products.filter(p => p.category === categoria);


filtrados.forEach(product => {
contenedor.innerHTML += `
<div class="product-card">
<img src="${product.image}" />
<h3>${product.name}</h3>
<p>$${product.price}</p>
<button onclick="addToCart(${product.id})">Agregar</button>
</div>`;
});
}


mostrarProductos();
</script>
