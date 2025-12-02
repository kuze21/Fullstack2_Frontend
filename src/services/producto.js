const API = "http://localhost:8080/api/productos";

export async function crearProducto(producto) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });

  if (!res.ok) {
    // Intenta leer el cuerpo de la respuesta para obtener más detalle
    let body = null
    try {
      const text = await res.text()
      // intenta parsear JSON si se puede
      body = text ? JSON.parse(text) : text
    } catch (e) {
      body = await res.text().catch(() => null)
    }
    const msg = (body && body.message) || (body && typeof body === 'string' ? body : null) || `HTTP ${res.status} ${res.statusText}`
    throw new Error(`Error al crear el producto: ${msg}`)
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
