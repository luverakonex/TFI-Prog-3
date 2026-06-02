// ===============================
// API /api/cloudinary-sign
// ===============================
// POST (solo admin) → devuelve firma para subir imágenes a Cloudinary de forma segura.
//s

const crypto = require("crypto");
const { isAdmin } = require("./_auth");

function send(res, code, body){
  res.statusCode = code;
  res.setHeader("Content-Type","application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { error: "Método no permitido" });
  if (!isAdmin(req)) return send(res, 401, { error: "No autorizado" });

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret){
    return send(res, 500, { error: "Faltan variables de Cloudinary" });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "konextech";

  const toSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash("sha1").update(toSign).digest("hex");

  return send(res, 200, { cloudName, apiKey, timestamp, folder, signature });
};
