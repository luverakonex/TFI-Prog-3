// ===============================
// API /api/checkout
// ===============================
// POST → genera un ID de pedido (KX-XXXXXX).
// Nota: acá NO se cobra, el cobro con tarjeta se hace por checkout externo.
// (Mercado Pago / Ualá)
//

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
  if (req.method !== "POST") return send(res, 405, { error: "Método no permitido" });

  let order;
  try{ order = await readBody(req); } catch { return send(res, 400, { error: "JSON inválido" }); }

  if (!order?.items?.length) return send(res, 400, { error: "Carrito vacío" });
  if (!order?.shipping?.fullName || !order?.shipping?.address){
    return send(res, 400, { error: "Faltan datos de envío" });
  }

  const orderId = `KX-${Date.now().toString().slice(-6)}`;
  return send(res, 200, { ok: true, orderId });
};
