//const API = "http://192.168.1.20:8080/api/productos"; //cambiar por la IP del servidor
const API = 'http://192.168.1.20:8080/api/productos';

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

export async function actualizarProducto(id, producto) {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error del servidor:", res.status, errorText);
    throw new Error(`Error al actualizar el producto: ${res.status} - ${errorText}`);
  }

  return res.json();
}

export async function eliminarProducto(id) {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error del servidor (DELETE):", res.status, errorText);
    throw new Error(`Error al eliminar el producto: ${res.status} - ${errorText}`);
  }

  // Algunos backends devuelven 204 No Content sin body
  if (res.status === 204) {
    return { success: true };
  }

  // Si hay contenido, devolver el JSON
  const text = await res.text();
  return text ? JSON.parse(text) : { success: true };
}
