const products = [
  { id: 1, name: "Caja Cute Rosa", price: 7990, category: "cajas", img: "https://via.placeholder.com/200" },
  { id: 2, name: "Lucky Game Mini", price: 2990, category: "lucky", img: "https://via.placeholder.com/200" },
  { id: 3, name: "Collar Heart", price: 4990, category: "accesorios", img: "https://via.placeholder.com/200" },
  { id: 4, name: "Pulsera HQ Beads", price: 3990, category: "hqbeads", img: "https://via.placeholder.com/200" }
];

const productList = document.getElementById("product-list");
const cartBtn = document.getElementById("cart-btn");
const checkoutBtn = document.getElementById("checkout-btn");
const cartSection = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

let cart = [];

/* Render de productos */
function renderProducts(filter = "all") {
  productList.innerHTML = "";

  products
    .filter(p => filter === "all" || p.category === filter)
    .forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.img}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="addToCart(${p.id})">Agregar</button>
      `;
      productList.appendChild(card);
    });
}

/* Agregar al carrito */
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

/* Actualizar carrito */
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement("div");
    div.innerText = `${item.name} - $${item.price}`;
    cartItems.appendChild(div);
    total += item.price;
  });

  cartTotal.innerText = `Total: $${total}`;
}

/* Mostrar / Ocultar carrito */
cartBtn.addEventListener("click", () => {
  cartSection.classList.toggle("hidden");
});

/* Filtro por categorías */
const categoryButtons = document.querySelectorAll(".sidebar li");

categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const cat = btn.getAttribute("data-category");
    renderProducts(cat);
  });
});

renderProducts();


mostrarProductos();
</script>
