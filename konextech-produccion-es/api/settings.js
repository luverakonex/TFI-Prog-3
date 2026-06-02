// ===============================
// API /api/settings
// ===============================
// GET  → devuelve configuración (banco + links de pago)
// POST → actualiza configuración (solo admin)
// Datos persistentes: Vercel KV


const { getSettings, setSettings } = require("./_store");
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
    const settings = await getSettings();
    return send(res, 200, settings);
  }

  if (req.method === "POST"){
    if (!isAdmin(req)) return send(res, 401, { error: "No autorizado" });

    let body;
    try{ body = await readBody(req); } catch { return send(res, 400, { error: "JSON inválido" }); }

    const current = await getSettings();
    const merged = { ...current, ...body };
    await setSettings(merged);
    return send(res, 200, merged);
  }

  return send(res, 405, { error: "Método no permitido" });
};
