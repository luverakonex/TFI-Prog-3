// ===============================
// API /api/products
// ===============================
// GET    → devuelve lista de productos
// POST   → crea producto (solo admin)
// DELETE → elimina producto por id (solo admin)
// Datos persistentes: Vercel KV


const crypto = require("crypto");
const { getProducts, setProducts } = require("./_store");
const { isAdmin } = require("./_auth");

function send(res, code, body){
  res.statusCode = code;
  res.setHeader("Content-Type","application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function readBody(req){
  return new Promise((resolve, reject)=>{
    let data = "";
    req.on("data", chunk => data += chunk);
    req.on("end", ()=>{
      if (!data) return resolve({});
      try{ resolve(JSON.parse(data)); }
      catch(e){ reject(e); }
    });
  });
}

module.exports = async (req, res) => {
  if (req.method === "GET"){
    const products = await getProducts();
    return send(res, 200, products);
  }

  if (req.method === "POST"){
    if (!isAdmin(req)) return send(res, 401, { error: "No autorizado" });

    let body;
    try{ body = await readBody(req); } catch { return send(res, 400, { error: "JSON inválido" }); }

    const { title, description, price, category, imageUrl } = body || {};
    if (!title || price == null || !category){
      return send(res, 400, { error: "Faltan campos requeridos" });
    }

    const products = await getProducts();
    const id = crypto.randomBytes(6).toString("hex");
    const item = {
      id,
      title: String(title).trim(),
      description: String(description || "").trim(),
      price: Number(price),
      category: String(category).trim(),
      imageUrl: String(imageUrl || "")
    };
    products.unshift(item);
    await setProducts(products);
    return send(res, 200, item);
  }

  if (req.method === "DELETE"){
    if (!isAdmin(req)) return send(res, 401, { error: "No autorizado" });
    const id = (req.query && req.query.id) || (new URL(req.url, "http://x").searchParams.get("id"));
    if (!id) return send(res, 400, { error: "Falta id" });

    const products = await getProducts();
    const next = products.filter(p => p.id !== id);
    await setProducts(next);
    return send(res, 200, { ok: true });
  }

  return send(res, 405, { error: "Método no permitido" });
};
