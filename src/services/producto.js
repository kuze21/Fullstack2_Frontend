const API = "http://192.168.1.20:8080/api/productos"; //cambiar por la IP del servidor

export async function crearProducto(producto) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });

  if (!res.ok) {
    throw new Error("Error al crear el producto");
  }

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
