# KONEXTECH — Producción (Vercel + Cloudinary + Vercel KV)

Este proyecto es una tienda web simple para tu local (KONEXTECH) con:
- Catálogo de productos por categorías
- Carrito con total y **envío sin cargo**
- Página de métodos de pago (transferencia / depósito + links de pago)
- Panel **Admin** para cargar productos (con foto), y configurar datos bancarios y links de pago
- Fotos en **Cloudinary** (no se pierden)
- Datos en **Vercel KV** (no se pierden)

---

## ✅ Requisitos
- Node.js 18+
- Cuenta en Vercel
- Cuenta en Cloudinary

---

## 🔐 Variables de entorno (Vercel → Project → Settings → Environment Variables)

### Admin
- `ADMIN_PASSWORD` = (poné una clave fuerte)

### Cloudinary (para subir imágenes)
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### Vercel KV (persistencia)
Creá **Storage → KV** y conectalo al proyecto.
Vercel te agrega solo:
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

---

## ▶️ Correr local (en tu PC)
1) Abrí la carpeta en VS Code
2) Terminal:

```bash
npm install
npx vercel dev
```

- Tienda: http://localhost:3000
- Admin:  http://localhost:3000/admin.html

---

## 🚀 Subir a producción (Vercel)
- Subí el proyecto a GitHub o importalo directo desde Vercel
- Conectá KV y cargá las variables de entorno
- Deploy: Vercel lo hace automático (o desde consola):

```bash
npx vercel --prod
```

---

## 💳 Configurar pagos (Mercado Pago + Ualá)
1) Entrá a `/admin.html`
2) Poné la contraseña (la de `ADMIN_PASSWORD`) y guardala
3) Pegá:
- Link de pago / checkout de Mercado Pago → botón “Pagar con Mercado Pago”
- Link de pago / checkout de Ualá → botón “Pagar con Ualá”

---

## 🧩 Estructura del proyecto
- `/index.html` → tienda
- `/admin.html` → panel admin
- `/css/styles.css` → estilos
- `/js/app.js` → lógica de tienda + carrito
- `/js/admin.js` → lógica del admin (subir fotos y crear productos)
- `/api/*` → endpoints (Vercel Functions)
  - `/api/products` → lista/alta/baja de productos
  - `/api/settings` → datos bancarios + links de pago
  - `/api/checkout` → genera un ID de pedido
  - `/api/cloudinary-sign` → firma segura para subir a Cloudinary

---

## 📝 Nota importante (seguridad)
No pidas datos de tarjeta para cargarlos “a mano”. Eso es inseguro.
En esta versión, el pago con tarjeta se hace por **checkout externo** (Mercado Pago / Ualá).
