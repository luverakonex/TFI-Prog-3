// Helper de auth
// Valida admin por header "x-admin-password" contra ADMIN_PASSWORD


function isAdmin(req){
  const token = req.headers["x-admin-password"];
  return token && process.env.ADMIN_PASSWORD && token === process.env.ADMIN_PASSWORD;
}
module.exports = { isAdmin };
