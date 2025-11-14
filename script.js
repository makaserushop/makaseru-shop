/* ========= datos de ejemplo ========= */
const products = [
  { id: 1, name: "Caja Sorpresa Premium", price: 14990, img: "https://via.placeholder.com/400x300?text=Caja+Sorpresa", category: "cajas" },
  { id: 2, name: "Lucky Game - Mini", price: 2990, img: "https://via.placeholder.com/400x300?text=Lucky+Game", category: "lucky" },
  { id: 3, name: "Pulsera Cute", price: 3990, img: "https://via.placeholder.com/400x300?text=Pulsera+Cute", category: "accesorios" },
  { id: 4, name: "HQ Beads Set", price: 4990, img: "https://via.placeholder.com/400x300?text=HQ+Beads", category: "hqb" }
];

/* ========== estado del carrito (persistente) ========== */
let cart = JSON.parse(localStorage.getItem('cart') || '[]'); // array de {id, qty}

/* ========== helpers ========== */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* ========== elementos DOM ========== */
const productList = $('#product-list');
const cartBtn = $('#cart-btn');
const cartPanel = $('#cart-panel');
const overlay = $('#overlay');
const cartItemsEl = $('#cart-items');
const cartCountEl = $('#cart-count');
const cartItemsCountEl = $('#cart-items-count') || { innerText: 0 }; // si no existe, evitar errores
const cartTotalEl = $('#cart-total');

/* ========== render productos ========== */
function renderProducts(filter = 'all'){
  productList.innerHTML = '';
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="product-name">${p.name}</div>
      <div class="product-price">$${p.price}</div>
      <button class="add-btn" data-id="${p.id}">Agregar</button>
    `;
    productList.appendChild(card);
  });

  // listeners añadir
  $$('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => addToCart(parseInt(btn.dataset.id)));
  });
}

/* ========== carrito: añadir (maneja qty) ========== */
function addToCart(id){
  const found = cart.find(i => i.id === id);
  if(found) found.qty += 1;
  else cart.push({ id, qty: 1 });
  saveCart();
  updateCartUI();
  openCartPanel();
}

/* ========== actualizar UI del carrito ========== */
function updateCartUI(){
  // contador total de items
  const totalItems = cart.reduce((s,it)=>s+it.qty,0);
  cartCountEl.innerText = totalItems;

  // items dentro del panel
  cartItemsEl.innerHTML = '';
  let totalPrice = 0;

  cart.forEach(entry => {
    const product = products.find(p => p.id === entry.id);
    if(!product) return;
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <div class="item-info">
        <div class="item-name">${product.name}</div>
        <div class="item-price">$${product.price}</div>
      </div>
      <div class="qty-controls">
        <button class="qty-decr" data-id="${entry.id}">−</button>
        <div class="qty">${entry.qty}</div>
        <button class="qty-incr" data-id="${entry.id}">＋</button>
        <button class="remove-item" data-id="${entry.id}" title="Eliminar" style="background:transparent;border:0;margin-left:6px;cursor:pointer">✕</button>
      </div>
    `;
    cartItemsEl.appendChild(itemEl);

    totalPrice += product.price * entry.qty;
  });

  // attach events (delegation would be fine but simple listeners ok)
  $$('.qty-incr').forEach(b => b.addEventListener('click', () => {
    const id = parseInt(b.dataset.id);
    changeQty(id, +1);
  }));
  $$('.qty-decr').forEach(b => b.addEventListener('click', () => {
    const id = parseInt(b.dataset.id);
    changeQty(id, -1);
  }));
  $$('.remove-item').forEach(b => b.addEventListener('click', () => {
    const id = parseInt(b.dataset.id);
    removeFromCart(id);
  }));

  if(cartItemsCountEl) cartItemsCountEl.innerText = totalItems;
  if(cartTotalEl) cartTotalEl.innerText = '$' + totalPrice;
}

/* ========== cambiar cantidad ========= */
function changeQty(id, delta){
  const it = cart.find(i=>i.id===id);
  if(!it) return;
  it.qty += delta;
  if(it.qty <= 0){
    cart = cart.filter(x=>x.id!==id);
  }
  saveCart();
  updateCartUI();
}

/* ========== eliminar ========= */
function removeFromCart(id){
  cart = cart.filter(i=>i.id!==id);
  saveCart();
  updateCartUI();
}

/* ========== open/close panel ========= */
function openCartPanel(){
  cartPanel.classList.remove('hidden');
  overlay.classList.remove('hidden');
}
function closeCartPanel(){
  cartPanel.classList.add('hidden');
  overlay.classList.add('hidden');
}

/* ========== guardar en localStorage ========= */
function saveCart(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

/* ========== load inicial ========= */
function init(){
  renderProducts();
  updateCartUI();

  // categorías
  $$('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      renderProducts(cat);
    });
  });

  // abrir/cerrar carrito
  cartBtn.addEventListener('click', () => {
    if(cartPanel.classList.contains('hidden')) openCartPanel();
    else closeCartPanel();
  });
  $('#close-cart')?.addEventListener('click', closeCartPanel);
  overlay.addEventListener('click', closeCartPanel);

  // Enviar carrito a pago.html (ya está en localStorage)
  $('#checkout-link').addEventListener('click', () => {
    // sólo redirige, pago.html leerá el localStorage
    closeCartPanel();
  });
}

init();
