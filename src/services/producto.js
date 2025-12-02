const API = "http://localhost:8080/api/productos";

export async function crearProducto(producto) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  return res.json();
}

export async function obtenerProductos() {
  const res = await fetch(API);
  return res.json();
}

export async function obtenerProducto(id) {
  const res = await fetch(`${API}/${id}`);
  return res.json();
}
