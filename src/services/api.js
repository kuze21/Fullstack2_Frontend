const BASE_URL = 'http://192.168.1.20:8080'; //cambiar por la IP del servidor
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

// --- ADMIN USUARIOS ---
export const fetchUsuarios = async (token) => {
	const response = await fetch(`${BASE_URL}/api/usuarios`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	});
	if (!response.ok) {
		const err = await response.json().catch(() => null);
		throw new Error(err?.message || `Error al obtener usuarios: ${response.status}`);
	}
	return response.json();
};

export const eliminarUsuario = async (userId, token) => {
	const response = await fetch(`${BASE_URL}/api/usuarios/${userId}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	});
	if (!response.ok) {
		const err = await response.json().catch(() => null);
		throw new Error(err?.message || `Error al eliminar usuario: ${response.status}`);
	}
	return response.json();
};

export const cambiarRolUsuario = async (userId, newRole, token) => {
	const response = await fetch(`${BASE_URL}/api/usuarios/${userId}/rol`, {
		method: 'PUT',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ rol: newRole })
	});
	if (!response.ok) {
		const err = await response.json().catch(() => null);
		throw new Error(err?.message || `Error al cambiar rol: ${response.status}`);
	}
	return response.json();
};

// --- ADMIN PRODUCTOS ---
export const fetchProductos = async () => {
	const response = await fetch(`${BASE_URL}/api/productos`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
	if (!response.ok) {
		const err = await response.json().catch(() => null);
		throw new Error(err?.message || `Error al obtener productos: ${response.status}`);
	}
	return response.json();
};

export const eliminarProducto = async (productId, token) => {
	const response = await fetch(`${BASE_URL}/api/productos/${productId}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	});
	if (!response.ok) {
		const err = await response.json().catch(() => null);
		throw new Error(err?.message || `Error al eliminar producto: ${response.status}`);
	}
	return response.json();
};