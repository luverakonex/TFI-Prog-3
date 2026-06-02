// ===============================
// KONEXTECH — Productos ficticios (demo)
// ===============================
// 50 productos de electrónica para probar catálogo + filtros + carrito.
//
// IMPORTANTE:
// - La web los usa automáticamente cuando /api no está disponible.
// - Se guardan en LocalStorage como "konex_products_local" para que después
//   puedas editarlos desde el Admin (sin backend).

window.KONEX_MOCK_PRODUCTS = [
  {
    "id": "mock-001",
    "title": "Auriculares Bluetooth",
    "description": "Auriculares Bluetooth — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 169500,
    "category": "electronica",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BAuriculares%20Bluetooth"
  },
  {
    "id": "mock-002",
    "title": "Parlante Portátil",
    "description": "Parlante Portátil — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 21500,
    "category": "electronica",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BParlante%20Port%C3%A1til"
  },
  {
    "id": "mock-003",
    "title": "Teclado Mecánico",
    "description": "Teclado Mecánico — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 157500,
    "category": "electronica",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BTeclado%20Mec%C3%A1nico"
  },
  {
    "id": "mock-004",
    "title": "Mouse Gamer",
    "description": "Mouse Gamer — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 176000,
    "category": "electronica",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BMouse%20Gamer"
  },
  {
    "id": "mock-005",
    "title": "Monitor 24''",
    "description": "Monitor 24'' — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 114000,
    "category": "electronica",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BMonitor%2024%27%27"
  },
  {
    "id": "mock-006",
    "title": "Router Wi‑Fi 6",
    "description": "Router Wi‑Fi 6 — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 70000,
    "category": "electronica",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BRouter%20Wi%E2%80%91Fi%206"
  },
  {
    "id": "mock-007",
    "title": "Pendrive 128GB",
    "description": "Pendrive 128GB — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 177000,
    "category": "electronica",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BPendrive%20128GB"
  },
  {
    "id": "mock-008",
    "title": "Disco SSD 1TB",
    "description": "Disco SSD 1TB — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 20000,
    "category": "electronica",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BDisco%20SSD%201TB"
  },
  {
    "id": "mock-009",
    "title": "Webcam Full HD",
    "description": "Webcam Full HD — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 12000,
    "category": "electronica",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BWebcam%20Full%20HD"
  },
  {
    "id": "mock-010",
    "title": "Micrófono USB",
    "description": "Micrófono USB — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 17000,
    "category": "electronica",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BMicr%C3%B3fono%20USB"
  },
  {
    "id": "mock-011",
    "title": "Smart TV 50''",
    "description": "Smart TV 50'' — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 246500,
    "category": "hogar",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BSmart%20TV%2050%27%27"
  },
  {
    "id": "mock-012",
    "title": "Soporte TV",
    "description": "Soporte TV — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 281000,
    "category": "hogar",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BSoporte%20TV"
  },
  {
    "id": "mock-013",
    "title": "Cámara de Seguridad",
    "description": "Cámara de Seguridad — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 28000,
    "category": "hogar",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BC%C3%A1mara%20de%20Seguridad"
  },
  {
    "id": "mock-014",
    "title": "Tira LED RGB",
    "description": "Tira LED RGB — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 317500,
    "category": "hogar",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BTira%20LED%20RGB"
  },
  {
    "id": "mock-015",
    "title": "Aspiradora Robot",
    "description": "Aspiradora Robot — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 261000,
    "category": "hogar",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BAspiradora%20Robot"
  },
  {
    "id": "mock-016",
    "title": "Cargador Inalámbrico",
    "description": "Cargador Inalámbrico — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 147000,
    "category": "hogar",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BCargador%20Inal%C3%A1mbrico"
  },
  {
    "id": "mock-017",
    "title": "Pava Eléctrica",
    "description": "Pava Eléctrica — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 16000,
    "category": "hogar",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BPava%20El%C3%A9ctrica"
  },
  {
    "id": "mock-018",
    "title": "Freidora de Aire",
    "description": "Freidora de Aire — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 333500,
    "category": "hogar",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BFreidora%20de%20Aire"
  },
  {
    "id": "mock-019",
    "title": "Enchufe Smart",
    "description": "Enchufe Smart — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 80500,
    "category": "hogar",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BEnchufe%20Smart"
  },
  {
    "id": "mock-020",
    "title": "Sensor de Movimiento",
    "description": "Sensor de Movimiento — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 376500,
    "category": "hogar",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BSensor%20de%20Movimiento"
  },
  {
    "id": "mock-021",
    "title": "Smartphone KX One",
    "description": "Smartphone KX One — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 479500,
    "category": "celulares",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BSmartphone%20KX%20One"
  },
  {
    "id": "mock-022",
    "title": "Smartphone KX Pro",
    "description": "Smartphone KX Pro — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 144500,
    "category": "celulares",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BSmartphone%20KX%20Pro"
  },
  {
    "id": "mock-023",
    "title": "Funda Antigolpes",
    "description": "Funda Antigolpes — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 633000,
    "category": "celulares",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BFunda%20Antigolpes"
  },
  {
    "id": "mock-024",
    "title": "Vidrio Templado",
    "description": "Vidrio Templado — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 555500,
    "category": "celulares",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BVidrio%20Templado"
  },
  {
    "id": "mock-025",
    "title": "Cargador Rápido 33W",
    "description": "Cargador Rápido 33W — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 279500,
    "category": "celulares",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BCargador%20R%C3%A1pido%2033W"
  },
  {
    "id": "mock-026",
    "title": "Cable USB‑C",
    "description": "Cable USB‑C — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 523000,
    "category": "celulares",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BCable%20USB%E2%80%91C"
  },
  {
    "id": "mock-027",
    "title": "Power Bank 20.000mAh",
    "description": "Power Bank 20.000mAh — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 642500,
    "category": "celulares",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BPower%20Bank%2020.000mAh"
  },
  {
    "id": "mock-028",
    "title": "Soporte Auto Magnético",
    "description": "Soporte Auto Magnético — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 56500,
    "category": "celulares",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BSoporte%20Auto%20Magn%C3%A9tico"
  },
  {
    "id": "mock-029",
    "title": "Auricular In‑Ear",
    "description": "Auricular In‑Ear — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 612000,
    "category": "celulares",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BAuricular%20In%E2%80%91Ear"
  },
  {
    "id": "mock-030",
    "title": "Chip eSIM (demo)",
    "description": "Chip eSIM (demo) — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 511000,
    "category": "celulares",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BChip%20eSIM%20%28demo%29"
  },
  {
    "id": "mock-031",
    "title": "Smartwatch KX Fit",
    "description": "Smartwatch KX Fit — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 135000,
    "category": "smartwatch",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BSmartwatch%20KX%20Fit"
  },
  {
    "id": "mock-032",
    "title": "Smartwatch KX Active",
    "description": "Smartwatch KX Active — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 158500,
    "category": "smartwatch",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BSmartwatch%20KX%20Active"
  },
  {
    "id": "mock-033",
    "title": "Correa de Silicona",
    "description": "Correa de Silicona — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 34500,
    "category": "smartwatch",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BCorrea%20de%20Silicona"
  },
  {
    "id": "mock-034",
    "title": "Cargador Magnético",
    "description": "Cargador Magnético — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 145000,
    "category": "smartwatch",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BCargador%20Magn%C3%A9tico"
  },
  {
    "id": "mock-035",
    "title": "Protector de Pantalla",
    "description": "Protector de Pantalla — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 121000,
    "category": "smartwatch",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BProtector%20de%20Pantalla"
  },
  {
    "id": "mock-036",
    "title": "Banda Deportiva",
    "description": "Banda Deportiva — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 179500,
    "category": "smartwatch",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BBanda%20Deportiva"
  },
  {
    "id": "mock-037",
    "title": "Reloj Kids",
    "description": "Reloj Kids — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 46000,
    "category": "smartwatch",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BReloj%20Kids"
  },
  {
    "id": "mock-038",
    "title": "Pulsera Inteligente",
    "description": "Pulsera Inteligente — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 19500,
    "category": "smartwatch",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BPulsera%20Inteligente"
  },
  {
    "id": "mock-039",
    "title": "Dock de Carga",
    "description": "Dock de Carga — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 133000,
    "category": "smartwatch",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BDock%20de%20Carga"
  },
  {
    "id": "mock-040",
    "title": "Kit Correas 3u",
    "description": "Kit Correas 3u — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 19500,
    "category": "smartwatch",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BKit%20Correas%203u"
  },
  {
    "id": "mock-041",
    "title": "Drone Mini",
    "description": "Drone Mini — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 11000,
    "category": "juguetes",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BDrone%20Mini"
  },
  {
    "id": "mock-042",
    "title": "Auto RC",
    "description": "Auto RC — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 189000,
    "category": "juguetes",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BAuto%20RC"
  },
  {
    "id": "mock-043",
    "title": "Auriculares Kids",
    "description": "Auriculares Kids — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 100500,
    "category": "juguetes",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BAuriculares%20Kids"
  },
  {
    "id": "mock-044",
    "title": "Consola Retro",
    "description": "Consola Retro — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 210000,
    "category": "juguetes",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BConsola%20Retro"
  },
  {
    "id": "mock-045",
    "title": "Cámara Instantánea Kids",
    "description": "Cámara Instantánea Kids — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 179500,
    "category": "juguetes",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BC%C3%A1mara%20Instant%C3%A1nea%20Kids"
  },
  {
    "id": "mock-046",
    "title": "Robot Programable",
    "description": "Robot Programable — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 200000,
    "category": "juguetes",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BRobot%20Programable"
  },
  {
    "id": "mock-047",
    "title": "Kit STEM Electrónica",
    "description": "Kit STEM Electrónica — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 123500,
    "category": "juguetes",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BKit%20STEM%20Electr%C3%B3nica"
  },
  {
    "id": "mock-048",
    "title": "Proyector Estrellas",
    "description": "Proyector Estrellas — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 18000,
    "category": "juguetes",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BProyector%20Estrellas"
  },
  {
    "id": "mock-049",
    "title": "Gafas VR",
    "description": "Gafas VR — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 91000,
    "category": "juguetes",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BGafas%20VR"
  },
  {
    "id": "mock-050",
    "title": "Puzzle 3D LED",
    "description": "Puzzle 3D LED — producto de prueba para catálogo KONEXTECH. Ideal para testear búsqueda, filtros y carrito.",
    "price": 79000,
    "category": "juguetes",
    "imageUrl": "https://via.placeholder.com/800x500?text=KONEXTECH%2BPuzzle%203D%20LED"
  }
];
