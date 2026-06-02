// Helper de storage (Vercel KV)
// Guarda y lee productos y configuración en KV (persistente).


const { kv } = require("@vercel/kv");

const PRODUCTS_KEY = "konex_products";
const SETTINGS_KEY = "konex_settings";

async function getProducts(){
  return (await kv.get(PRODUCTS_KEY)) || [];
}
async function setProducts(products){
  await kv.set(PRODUCTS_KEY, products);
}
async function getSettings(){
  return (await kv.get(SETTINGS_KEY)) || {
    bank: { titular: "KONEXTECH", banco: "Tu banco", cbu: "", alias: "", cuit: "" },
    mpCheckoutUrl: "",
    ualaCheckoutUrl: ""
  };
}
async function setSettings(settings){
  await kv.set(SETTINGS_KEY, settings);
}

module.exports = { getProducts, setProducts, getSettings, setSettings };
