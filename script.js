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
