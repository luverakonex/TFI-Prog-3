// ===============================
// KONEXTECH — Panel Admin
// ===============================
//
// Desde acá podés:
// - Guardar tu contraseña admin (se guarda en tu navegador)
// - Configurar datos bancarios
// - Pegar links de pago (Mercado Pago / Ualá)
// - Crear y eliminar productos
// - Subir foto a Cloudinary (más seguro y no se pierde)

const $ = (s)=>document.querySelector(s);

// ===============================
// Modo "sin backend" (fallback)
// ===============================
// Si /api no está disponible, el Admin trabaja con LocalStorage.

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

async function safeFetch(url, opts){
  try{ return await fetch(url, opts); }
  catch{ return null; }
}

// Contraseña admin guardada en el navegador
function obtenerClaveAdmin(){
  return localStorage.getItem("konex_admin_clave") || "";
}
function guardarClaveAdmin(clave){
  localStorage.setItem("konex_admin_clave", clave);
}

$("#savePassBtn").onclick = ()=>{
  guardarClaveAdmin($("#adminPass").value.trim());
  alert("Listo. Contraseña guardada en este navegador.");
};

// Helper para llamar a la API con header de admin
async function api(url, opciones={}){
  const clave = obtenerClaveAdmin();
  const headers = opciones.headers || {};
  return fetch(url, {
    ...opciones,
    headers: {
      ...headers,
      "x-admin-password": clave
    }
  });
}

// Carga datos actuales (banco + links)
async function cargarConfiguracion(){
  let config = null;
  const res = await safeFetch("/api/settings");
  if (res && res.ok) config = await res.json();
  else config = getLocalSettings();
  const b = config.bank || {};

  $("#bankForm").titular.value = b.titular || "";
  $("#bankForm").banco.value = b.banco || "";
  $("#bankForm").cbu.value = b.cbu || "";
  $("#bankForm").alias.value = b.alias || "";
  $("#bankForm").cuit.value = b.cuit || "";

  $("#checkoutLinkForm").mpCheckoutUrl.value = config.mpCheckoutUrl || "";
  $("#checkoutLinkForm").ualaCheckoutUrl.value = config.ualaCheckoutUrl || "";
}

// Guardar datos bancarios
$("#bankForm").addEventListener("submit", async (e)=>{
  e.preventDefault();
  $("#bankMsg").textContent = "Guardando...";

  const fd = new FormData(e.currentTarget);
  const payload = {
    bank: {
      titular: fd.get("titular"),
      banco: fd.get("banco"),
      cbu: fd.get("cbu"),
      alias: fd.get("alias"),
      cuit: fd.get("cuit")
    }
  };

  const res = await safeFetch("/api/settings", {
    method:"POST",
    headers:{ "Content-Type":"application/json", "x-admin-password": obtenerClaveAdmin() },
    body: JSON.stringify(payload)
  });

  // Si no hay backend, guardamos local
  if (!res){
    const current = getLocalSettings();
    const merged = { ...current, ...payload };
    setLocalSettings(merged);
    $("#bankMsg").textContent = "Guardado ✅ (local)";
    return;
  }

  const data = await res.json();
  if (res.ok){
    setLocalSettings(data); // por si estás en modo mixto
  }
  $("#bankMsg").textContent = res.ok ? "Guardado ✅" : (data?.error || "Error");
});

// Guardar links de pago (Mercado Pago / Ualá)
$("#checkoutLinkForm").addEventListener("submit", async (e)=>{
  e.preventDefault();
  $("#linkMsg").textContent = "Guardando...";

  const fd = new FormData(e.currentTarget);
  const payload = {
    mpCheckoutUrl: fd.get("mpCheckoutUrl"),
    ualaCheckoutUrl: fd.get("ualaCheckoutUrl")
  };

  const res = await safeFetch("/api/settings", {
    method:"POST",
    headers:{ "Content-Type":"application/json", "x-admin-password": obtenerClaveAdmin() },
    body: JSON.stringify(payload)
  });

  if (!res){
    const current = getLocalSettings();
    const merged = { ...current, ...payload };
    setLocalSettings(merged);
    $("#linkMsg").textContent = "Guardado ✅ (local)";
    return;
  }

  const data = await res.json();
  if (res.ok) setLocalSettings(data);
  $("#linkMsg").textContent = res.ok ? "Guardado ✅" : (data?.error || "Error");
});

// Subida segura a Cloudinary (pide firma al backend)
async function subirImagenACloudinary(archivo){
  const firmaRes = await safeFetch("/api/cloudinary-sign", {
    method:"POST",
    headers:{ "x-admin-password": obtenerClaveAdmin() }
  });
  if (!firmaRes) throw new Error("Backend no disponible");
  const firma = await firmaRes.json();
  if (!firmaRes.ok) throw new Error(firma?.error || "Error firmando upload");

  const url = `https://api.cloudinary.com/v1_1/${firma.cloudName}/image/upload`;
  const form = new FormData();
  form.append("file", archivo);
  form.append("api_key", firma.apiKey);
  form.append("timestamp", firma.timestamp);
  form.append("signature", firma.signature);
  if (firma.folder) form.append("folder", firma.folder);

  const up = await fetch(url, { method:"POST", body: form });
  const data = await up.json();
  if (!up.ok) throw new Error(data?.error?.message || "Error subiendo a Cloudinary");
  return data.secure_url;
}

// Fallback: convertir archivo a DataURL (base64) para guardar localmente
function archivoADataURL(file){
  return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.onload = ()=> resolve(String(reader.result || ""));
    reader.onerror = ()=> reject(new Error("No se pudo leer la imagen"));
    reader.readAsDataURL(file);
  });
}

// Crear producto
$("#productForm").addEventListener("submit", async (e)=>{
  e.preventDefault();
  $("#prodMsg").textContent = "Publicando...";

  const fd = new FormData(e.currentTarget);

  const titulo = fd.get("title");
  const descripcion = fd.get("description");
  const precio = fd.get("price");
  const categoria = fd.get("category");
  const archivo = e.currentTarget.image.files?.[0];

  let imageUrl = "";

  try{
    // 1) Intentamos Cloudinary (si hay backend + variables)
    if (archivo){
      try{
        $("#prodMsg").textContent = "Subiendo imagen...";
        imageUrl = await subirImagenACloudinary(archivo);
      }catch{
        // 2) Si no hay backend, guardamos la imagen en base64 (solo para pruebas)
        $("#prodMsg").textContent = "Guardando imagen (local)...";
        imageUrl = await archivoADataURL(archivo);
      }
    }

    $("#prodMsg").textContent = "Guardando producto...";
    const payload = { title: titulo, description: descripcion, price: Number(precio), category: categoria, imageUrl };

    const res = await safeFetch("/api/products", {
      method:"POST",
      headers:{ "Content-Type":"application/json", "x-admin-password": obtenerClaveAdmin() },
      body: JSON.stringify(payload)
    });

    if (!res){
      const productos = getLocalProducts();
      const id = `local-${Date.now().toString(36)}`;
      productos.unshift({ id, ...payload });
      setLocalProducts(productos);
      $("#prodMsg").textContent = "Publicado ✅ (local)";
      e.currentTarget.reset();
      await cargarProductos();
      return;
    }

    const data = await res.json();
    if (!res.ok){
      $("#prodMsg").textContent = data?.error || "Error al publicar";
      return;
    }

    // Guardamos también local por si estás probando sin backend en otro entorno
    const next = [data, ...getLocalProducts().filter(p=>p.id!==data.id)];
    setLocalProducts(next);

    $("#prodMsg").textContent = "Publicado ✅";
    e.currentTarget.reset();
    await cargarProductos();
  }catch(err){
    $("#prodMsg").textContent = err?.message || "Error";
  }
});

function dineroARS(n){
  return new Intl.NumberFormat("es-AR", { style:"currency", currency:"ARS" }).format(n || 0);
}
function escapar(s){
  return String(s??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
}

// Lista productos en el admin + permite eliminar
async function cargarProductos(){
  $("#listMsg").textContent = "Cargando...";
  let productos = null;
  const res = await safeFetch("/api/products");
  if (res && res.ok) productos = await res.json();
  else {
    productos = getLocalProducts();
    if ((!productos || !productos.length) && window.KONEX_MOCK_PRODUCTS && Array.isArray(window.KONEX_MOCK_PRODUCTS)){
      productos = window.KONEX_MOCK_PRODUCTS;
      setLocalProducts(productos);
    }
  }

  const grilla = $("#adminProducts");
  grilla.innerHTML = "";
  $("#listMsg").textContent = `${productos.length} producto(s)`;

  productos.forEach(p=>{
    const el = document.createElement("article");
    el.className = "cardProd";
    el.innerHTML = `
      <img class="cardProd__img" src="${p.imageUrl || "https://via.placeholder.com/800x500?text=KONEXTECH"}">
      <div class="cardProd__body">
        <h4 class="cardProd__title">${escapar(p.title)}</h4>
        <p class="cardProd__desc">${escapar(p.description || "")}</p>
        <div class="cardProd__meta">
          <span class="price">${dineroARS(p.price)}</span>
          <span class="pill">${escapar(p.category)}</span>
        </div>
        <button class="btn" data-eliminar="${p.id}" style="background:rgba(12,15,13,.03); color:var(--text); border:1px solid rgba(12,15,13,.10)">Eliminar</button>
      </div>
    `;
    grilla.appendChild(el);
  });

  document.querySelectorAll("[data-eliminar]").forEach(btn=>{
    btn.onclick = async ()=>{
      if (!confirm("¿Eliminar este producto?")) return;

      const id = btn.dataset.eliminar;
      const res = await safeFetch(`/api/products?id=${encodeURIComponent(id)}`, {
        method:"DELETE",
        headers:{ "x-admin-password": obtenerClaveAdmin() }
      });

      if (!res){
        const next = getLocalProducts().filter(p=>p.id !== id);
        setLocalProducts(next);
        await cargarProductos();
        return;
      }

      const data = await res.json();
      if (!res.ok) return alert(data?.error || "Error");

      // Mantener local sincronizado
      const next = getLocalProducts().filter(p=>p.id !== id);
      setLocalProducts(next);
      await cargarProductos();
    };
  });
}

// ===== Arranque =====
cargarConfiguracion();
cargarProductos();
