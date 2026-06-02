// ===============================
// KONEXTECH — Tienda (Front)
// ===============================
//
// Acá está toda la lógica del catálogo, filtros, carrito y checkout.
// Está pensada para que puedas tocarla sin miedo.
//
// Nota: los IDs/clases del HTML se mantienen igual para no romper la interfaz.

// Migración: si venís de una versión anterior, pasamos el carrito al nuevo nombre
if (!localStorage.getItem("konex_carrito") && localStorage.getItem("konex_cart")) {
  localStorage.setItem("konex_carrito", localStorage.getItem("konex_cart"));
  localStorage.removeItem("konex_cart");
}

const estado = {
  productos: [],
  productosFiltrados: [],
  carrito: JSON.parse(localStorage.getItem("konex_carrito") || "[]"),
  configuracion: null,
  categoriaActual: null
};

// ===============================
// Modo "sin backend" (fallback)
// ===============================
// Si /api no está disponible (por ejemplo, la web subida como sitio estático),
// usamos LocalStorage con un catálogo demo para poder probar TODO.

const LS_PRODUCTS = "konex_products_local";
const LS_SETTINGS = "konex_settings_local";

function getLocalProducts(){
  try{ return JSON.parse(localStorage.getItem(LS_PRODUCTS) || "[]"); }
  catch{ return []; }
}
function setLocalProducts(products){
  localStorage.setItem(LS_PRODUCTS, JSON.stringify(products || []));
}
function getLocalSettings(){
  try{
    return JSON.parse(localStorage.getItem(LS_SETTINGS) || "null") || {
      bank: { titular: "KONEXTECH", banco: "Tu banco", cbu: "", alias: "", cuit: "" },
      mpCheckoutUrl: "",
      ualaCheckoutUrl: ""
    };
  }catch{
    return {
      bank: { titular: "KONEXTECH", banco: "Tu banco", cbu: "", alias: "", cuit: "" },
      mpCheckoutUrl: "",
      ualaCheckoutUrl: ""
    };
  }
}
function setLocalSettings(settings){
  localStorage.setItem(LS_SETTINGS, JSON.stringify(settings || {}));
}

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

// Formato de moneda ARS
function dineroARS(numero){
  return new Intl.NumberFormat("es-AR", { style:"currency", currency:"ARS" }).format(numero || 0);
}

// Guardar carrito en el navegador
function guardarCarrito(){
  localStorage.setItem("konex_carrito", JSON.stringify(estado.carrito));
  $("#cartCount").textContent = estado.carrito.reduce((acum, item)=>acum + item.cantidad, 0);
}

// Cambia de vista: inicio / pagos / carrito / contacto
function activarVista(idVista){
  $$(".view").forEach(v => v.classList.remove("is-active"));
  $(`#view-${idVista}`).classList.add("is-active");

  // marcar botón activo del menú
  $$(".nav__link").forEach(b => b.classList.remove("is-active"));
  const boton = document.querySelector(`.nav__link[data-view="${idVista}"]`);
  if (boton) boton.classList.add("is-active");

  if (idVista === "cart") dibujarCarrito();
}

// Menú superior (navegación)
function vincularMenu(){
  $$(".nav__link[data-view]").forEach(boton=>{
    boton.addEventListener("click", ()=> activarVista(boton.dataset.view));
  });

  // Dropdown de categorías
  $$(".nav__item[data-category]").forEach(boton=>{
    boton.addEventListener("click", ()=>{
      estado.categoriaActual = boton.dataset.category;
      aplicarFiltros();
      activarVista("home");
    });
  });
}

// Buscar + ordenar + filtrar por categoría
function aplicarFiltros(){
  const texto = ($("#searchInput").value || "").trim().toLowerCase();
  const orden = $("#sortSelect").value;

  let lista = [...estado.productos];

  if (estado.categoriaActual){
    lista = lista.filter(p => (p.category || "").toLowerCase() === estado.categoriaActual);
  }

  if (texto){
    lista = lista.filter(p =>
      (p.title||"").toLowerCase().includes(texto) ||
      (p.description||"").toLowerCase().includes(texto)
    );
  }

  if (orden === "asc")  lista.sort((a,b)=> (a.price||0) - (b.price||0));
  if (orden === "desc") lista.sort((a,b)=> (b.price||0) - (a.price||0));
  // "new" => se deja como viene del backend (los más nuevos primero)

  estado.productosFiltrados = lista;
  $("#productsInfo").textContent =
    `${lista.length} producto(s)` + (estado.categoriaActual ? ` • categoría: ${estado.categoriaActual}` : "");

  dibujarProductos();
}

// Render de tarjetas de productos
function dibujarProductos(){
  const grilla = $("#productsGrid");
  grilla.innerHTML = "";

  if (!estado.productosFiltrados.length){
    grilla.innerHTML = `<div class="card" style="grid-column:span 12">
      <h4>No hay productos para mostrar</h4>
      <p class="muted">Probá buscar otra palabra o elegí otra categoría.</p>
    </div>`;
    return;
  }

  estado.productosFiltrados.forEach(prod=>{
    const card = document.createElement("article");
    card.className = "cardProd";
    card.innerHTML = `
      <img class="cardProd__img" src="${prod.imageUrl || "https://via.placeholder.com/800x500?text=KONEXTECH"}" alt="${escaparHTML(prod.title)}">
      <div class="cardProd__body">
        <h4 class="casrdProd__title">${escaparHTML(prod.title)}</h4>
        <p class="cardProd__desc">${escaparHTML(prod.description || "Sin descripción.")}</p>
        <div class="cardProd__meta">
          <span class="price">${dineroARS(prod.price)}</span>
          <span class="pill">${escaparHTML(prod.category)}</span>
        </div>
        <button class="btn btn--primary" data-agregar="${prod.id}">Agregar al carrito</button>
      </div>
    `;
    grilla.appendChild(card);
  });


  $$("button[data-agregar]").forEach(boton=>{
    boton.addEventListener("click", ()=>{
      const id = boton.dataset.agregar;
      const prod = estado.productos.find(x=>x.id===id);
      if (!prod) return;
      agregarAlCarrito(prod);
    });
  });
}

function alertaBoton (){
  <div class="alert alert-success" role="alert">
    <h4 class="alert-heading">Compra Agregada!</h4>
  </div>

};
// Agrega un producto al carrito (o suma cantidad si ya existe)
function agregarAlCarrito(producto){
  const indice = estado.carrito.findIndex(i=>i.id===producto.id);
  if (indice >= 0) estado.carrito[indice].cantidad += 1;
  else estado.carrito.push({ id: producto.id, cantidad: 1 });

  guardarCarrito();
}

// Arma líneas del carrito (producto + cantidad + total por línea)
function lineasDelCarrito(){
  return estado.carrito
    .map(item => {
      const p = estado.productos.find(x=>x.id===item.id);
      if (!p) return null;
      return { ...p, cantidad: item.cantidad, totalLinea: (p.price||0) * item.cantidad };
    })
    .filter(Boolean);
}

// Render del carrito
function dibujarCarrito(){
  const contenedor = $("#cartItems");
  const lineas = lineasDelCarrito();
  contenedor.innerHTML = "";

  if (!lineas.length){
    contenedor.innerHTML = `<div class="card">
      <h4>Tu carrito está vacío</h4>
      <p class="muted">Volvé a Inicio y agregá productos.</p>
    </div>`;
    $("#subtotal").textContent = dineroARS(0);
    $("#total").textContent = dineroARS(0);
    return;
  }

  lineas.forEach(linea=>{
    const fila = document.createElement("div");
    fila.className = "cartItem";
    fila.innerHTML = `
      <img src="${linea.imageUrl || "https://via.placeholder.com/300x300?text=KONEXTECH"}" alt="${escaparHTML(linea.title)}">
      <div class="cartItem__info">
        <p class="cartItem__title"><b>${escaparHTML(linea.title)}</b></p>
        <p class="cartItem__desc">${dineroARS(linea.price)} • ${escaparHTML(linea.category)}</p>
      </div>
      <div class="qty">
        <button data-restar="${linea.id}">−</button>
        <span>${linea.cantidad}</span>
        <button data-sumar="${linea.id}">+</button>
      </div>
      <div style="min-width:110px; text-align:right"><b>${dineroARS(linea.totalLinea)}</b></div>
    `;
    contenedor.appendChild(fila);
  });

  $$("button[data-sumar]").forEach(b=>b.onclick=()=>cambiarCantidad(b.dataset.sumar, +1));
  $$("button[data-restar]").forEach(b=>b.onclick=()=>cambiarCantidad(b.dataset.restar, -1));

  const subtotal = lineas.reduce((acum,l)=>acum + l.totalLinea, 0);
  $("#subtotal").textContent = dineroARS(subtotal);
  $("#total").textContent = dineroARS(subtotal); // envío sin cargo
}

// Suma o resta cantidad en carrito
function cambiarCantidad(id, delta){
  const item = estado.carrito.find(x=>x.id===id);
  if (!item) return;
  item.cantidad += delta;
  if (item.cantidad <= 0) estado.carrito = estado.carrito.filter(x=>x.id!==id);
  guardarCarrito();
  dibujarCarrito();
}

// Escape básico para evitar HTML raro en títulos/descripciones
function escaparHTML(texto){
  return String(texto ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

// Carga inicial: productos + configuración (banco + links)
async function cargarTodo(){
  $("#year").textContent = new Date().getFullYear();

  // 1) Intentamos cargar desde /api (modo Vercel)
  // 2) Si falla, usamos LocalStorage (modo estático)
  let productos = null;
  let configuracion = null;

  try{
    const [pRes, sRes] = await Promise.all([
      fetch("/api/products"),
      fetch("/api/settings")
    ]);
    if (!pRes.ok || !sRes.ok) throw new Error("API no disponible");
    productos = await pRes.json();
    configuracion = await sRes.json();
  }catch{
    productos = getLocalProducts();
    configuracion = getLocalSettings();
  }

  // Si todavía no hay productos, sembramos 50 ficticios (mock) para testear
  if (!Array.isArray(productos) || productos.length === 0){
    const seed = (window.KONEX_MOCK_PRODUCTS && Array.isArray(window.KONEX_MOCK_PRODUCTS))
      ? window.KONEX_MOCK_PRODUCTS
      : [];
    productos = seed;
    // Guardamos en local para que puedas editarlos después
    setLocalProducts(productos);
  }

  estado.productos = productos;
  estado.configuracion = configuracion || getLocalSettings();
  // Guardamos settings local por si estás en modo estático
  setLocalSettings(estado.configuracion);

  // Datos bancarios
  const banco = configuracion?.bank || {};
  $("#bankDetails").textContent =
`Titular: ${banco.titular || ""}
Banco:   ${banco.banco || ""}
CBU:     ${banco.cbu || ""}
Alias:   ${banco.alias || ""}
CUIT:    ${banco.cuit || ""}`;

  // Links de pago (checkout externo)
  const btnMP = $("#mpPayBtn");
  const btnUala = $("#ualaPayBtn");
  const linkMP = configuracion?.mpCheckoutUrl || "";
  const linkUala = configuracion?.ualaCheckoutUrl || "";

  if (linkMP) btnMP.href = linkMP;
  else {
    btnMP.href = "#";
    btnMP.addEventListener("click", (e)=>{
      e.preventDefault();
      alert("Todavía no configuraste el link de Mercado Pago. Entrá al Admin y pegalo.");
    });
  }

  if (linkUala) btnUala.href = linkUala;
  else {
    btnUala.href = "#";
    btnUala.addEventListener("click", (e)=>{
      e.preventDefault();
      alert("Todavía no configuraste el link de Ualá. Entrá al Admin y pegalo.");
    });
  }

  // Estado inicial
  estado.productosFiltrados = [...estado.productos];
  $("#productsInfo").textContent = `${estado.productos.length} producto(s)`;
  guardarCarrito();
  dibujarProductos();
}

// Buscador + orden
function vincularBuscador(){
  $("#searchInput").addEventListener("input", aplicarFiltros);
  $("#sortSelect").addEventListener("change", aplicarFiltros);
}

// Checkout: genera un pedido y (si eligió tarjeta) lo manda al link de pago
function vincularCheckout(){
  $("#checkoutForm").addEventListener("submit", async (e)=>{
    e.preventDefault();
    const lineas = lineasDelCarrito();
    if (!lineas.length) return;

    const fd = new FormData(e.currentTarget);
    const envio = {
      nombreCompleto: fd.get("fullName"),
      telefono: fd.get("phone"),
      direccion: fd.get("address"),
      notas: fd.get("notes") || ""
    };
    const metodoPago = fd.get("payMethod");

    const payload = {
      items: lineas.map(l => ({ id:l.id, title:l.title, price:l.price, qty:l.cantidad })),
      totals: { total: lineas.reduce((a,l)=>a + l.totalLinea,0), shipping: 0 },
      shipping: { fullName: envio.nombreCompleto, phone: envio.telefono, address: envio.direccion, notes: envio.notas },
      payMethod: metodoPago
    };

    $("#orderMsg").textContent = "Procesando pedido...";
    const res = await fetch("/api/checkout", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok){
      $("#orderMsg").textContent = data?.error || "Error al generar pedido.";
      return;
    }

    const idPedido = data.orderId;

    if (metodoPago === "tarjeta_checkout") {
      const mp = estado.configuracion?.mpCheckoutUrl;
      const uala = estado.configuracion?.ualaCheckoutUrl;
      const link = mp || uala;

      if (link) {
        $("#orderMsg").innerHTML = `Pedido <b>${idPedido}</b> generado. Te llevo al checkout seguro...`;
        setTimeout(()=> window.open(link, "_blank"), 600);
      } else {
        $("#orderMsg").innerHTML = `Pedido <b>${idPedido}</b> generado. Falta configurar links de pago en Admin.`;
      }
    } else {
      $("#orderMsg").innerHTML = `Pedido <b>${idPedido}</b> generado. Pagá por transferencia y enviá comprobante.`;
    }

    // Vaciar carrito
    estado.carrito = [];
    guardarCarrito();
    dibujarCarrito();
  });
}

// ===== Arranque =====
vincularMenu();
vincularBuscador();
vincularCheckout();
cargarTodo();
