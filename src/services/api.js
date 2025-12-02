const BASE_URL = 'http://localhost:8080';
const API_AUTH_URL = `${BASE_URL}/api/auth`;

// --- AUTH ---
export const loginUser = async (credentials) => {
	const response = await fetch(`${API_AUTH_URL}/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(credentials),
	});
	if (!response.ok) {
		const err = await response.json().catch(() => null);
		throw new Error(err?.message || `HTTP ${response.status} ${response.statusText}`);
	}
	return response.json();
};

export const registerUser = async (userData) => {
	const response = await fetch(`${API_AUTH_URL}/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(userData),
	});
	if (!response.ok) {
			const err = await response.json();
			throw new Error(err.message || 'Error al registrar.');
	}
	return response.json();
};

// --- PRODUCTOS ---
export async function fetchProductos(materiaId) {
	const url = materiaId
		? `${BASE_URL}/api/productos?materiaId=${materiaId}`
		: `${BASE_URL}/api/productos`;
	const res = await fetch(url);
	if (!res.ok) throw new Error('Error al obtener productos');
	return res.json();
}

export async function subirProducto(datos, token) {
	const res = await fetch(`${BASE_URL}/api/productos`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(datos),
	});
	 if (!res.ok) throw new Error('Error al subir producto');
	return res.json();
}

//Pedidos 
export async function crearPedido(productoIds, token) {
		const res = await fetch(`${BASE_URL}/api/pedidos`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ productoIds }),   
		});
		if (!res.ok) throw new Error(`Error al crear el pedido`);
		const text = await res.text();
		return text ? JSON.parse(text) : null;
}

export async function fetchUsuarios(token) {
	const res = await fetch(`${BASE_URL}/api/usuarios`, {
		headers: { Authorization: `Bearer ${token}` }
	});
	return res.json();
}

export async function eliminarUsuario(id, token) {
	await fetch(`${BASE_URL}/api/usuarios/${id}`, {
		method: 'DELETE',
		headers: { Authorization: `Bearer ${token}` }
	});
}

export async function cambiarRolUsuario(id, nuevoRol, token) {
	await fetch(`${BASE_URL}/api/usuarios/${id}/rol`, {
		method: 'PUT',
		headers: { 
				'Content-Type': 'text/plain', 
				Authorization: `Bearer ${token}` 
		},
		body: nuevoRol
	});
}
export async function eliminarProducto(id, token) {
    await fetch(`${BASE_URL}/api/productos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
}

export async function crearUsuarioAdmin(datos, token) {
		const res = await fetch(`${BASE_URL}/api/usuarios`, {
			method: 'POST',
			headers: { 
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}` 
			},
			body: JSON.stringify(datos),
		});
		if (!res.ok) {
				const err = await res.json();
				throw new Error(err.message || 'Error al crear usuario');
		}
		return res.json();
}

export async function fetchPedidos(token) {
		const res = await fetch(`${BASE_URL}/api/pedidos`, {
				headers: { Authorization: `Bearer ${token}` }
		});
		return res.json();
}

export async function eliminarPedidoAdmin(id, token) {
		await fetch(`${BASE_URL}/api/pedidos/${id}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${token}` }
		});
}
