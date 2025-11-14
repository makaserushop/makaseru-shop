// LISTA DE PRODUCTOS
const products = [
  { id: 1, name: "Caja Cute", price: 12000, category: "cajas" },
  { id: 2, name: "Lucky Game Rosado", price: 6000, category: "lucky" },
  { id: 3, name: "Pulsera Corazón", price: 3500, category: "accesorios" },
  { id: 4, name: "HQ Beads Set", price: 5000, category: "hqb" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// MOSTRAR PRODUCTOS
function loadProducts(category = "all") {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  const filtered = category === "all" 
    ? products 
    : products.filter(p => p.category === category);

  filtered.forEach(p => {
    list.innerHTML += `
      <div class="product">
        <h4>${p.name}</h4>
        <p>$${p.price}</p>
        <button onclick="addToCart(${p.id})">Agregar</button>
      </div>`;
  });
}

loadProducts();

// FILTROS
document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    loadProducts(btn.getAttribute("data-category"));
  });
});

// AGREGAR AL CARRITO
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

// MOSTRAR CARRITO
function updateCart() {
  document.getElementById("cart-count").innerText = cart.length;

  const items = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");

  items.innerHTML = "";
  let sum = 0;

  cart.forEach(p => {
    items.innerHTML += `<p>• ${p.name} - $${p.price}</p>`;
    sum += p.price;
  });

  total.innerText = `Total: $${sum}`;
}

updateCart();

// MOSTRAR / OCULTAR PANEL
function toggleCart() {
  document.getElementById("cart-panel").classList.toggle("hidden");
}

