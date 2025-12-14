const API = "http://192.168.1.20:8080/api/cart";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function obtenerCarrito() {
  const res = await fetch(API, {
    method: "GET",
    headers: authHeaders(),
  });

  if (res.status === 401 || res.status === 403) {
    throw new Error("NO_AUTH");
  }
  if (!res.ok) throw new Error("Error al obtener carrito");

  return res.json();
}

export async function agregarAlCarrito(productId) {
  const res = await fetch(`${API}/items/${productId}`, {
    method: "POST",
    headers: authHeaders(),
  });

  if (res.status === 401 || res.status === 403) {
    throw new Error("NO_AUTH");
  }
  if (!res.ok) throw new Error("Error al agregar al carrito");

  return res.json();
}

export async function eliminarDelCarrito(productId) {
  const res = await fetch(`${API}/items/${productId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (res.status === 401 || res.status === 403) {
    throw new Error("NO_AUTH");
  }
  if (!res.ok) throw new Error("Error al eliminar del carrito");

  return res.json();
}

