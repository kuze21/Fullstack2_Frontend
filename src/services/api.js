//const BASE_URL = 'http://192.168.1.20:8080'; //cambiar por la IP del servidor
const BASE_URL = 'http://192.168.1.20:8080';
const API_AUTH_URL = `${BASE_URL}/api/auth`;

// --- helpers ---
async function parseJsonSafe(response) {
	const text = await response.text();
	if (!text) return null;
	try {
		return JSON.parse(text);
	} catch (err) {
		// Intenta extraer el primer bloque JSON válido dentro del texto
		const start = text.indexOf('[');
		const end = text.lastIndexOf(']');
		if (start !== -1 && end !== -1 && end > start) {
			const slice = text.slice(start, end + 1);
			try {
				return JSON.parse(slice);
			} catch (err2) {
				console.error('Fallo al parsear bloque JSON extraído. Status:', response.status, 'Preview:', slice.slice(0, 500));
				throw new Error(`Respuesta no válida del servidor (${response.status}). Detalle: ${slice.slice(0, 200)}`);
			}
		}

		console.error('Respuesta no es JSON. Status:', response.status, 'Preview:', text.slice(0, 500));
		throw new Error(`Respuesta no válida del servidor (${response.status}). Detalle: ${text.slice(0, 200)}`);
	}
}

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
	const response = await fetch(`${BASE_URL}/users`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	});
	if (!response.ok) {
		const err = await parseJsonSafe(response).catch(() => null);
		throw new Error((err && err.message) || `Error al obtener usuarios: ${response.status}`);
	}
	return parseJsonSafe(response);
};

export const eliminarUsuario = async (userId, token) => {
	const response = await fetch(`${BASE_URL}/users/${userId}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	});
	if (!response.ok) {
		const err = await parseJsonSafe(response).catch(() => null);
		throw new Error((err && err.message) || `Error al eliminar usuario: ${response.status}`);
	}
};

export const cambiarRolUsuario = async (userId, newRole, token) => {
	const response = await fetch(`${BASE_URL}/users/${userId}/rol`, {
		method: 'PUT',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({ rol: newRole })
	});
	if (!response.ok) {
		const err = await parseJsonSafe(response).catch(() => null);
		throw new Error((err && err.message) || `Error al cambiar rol: ${response.status}`);
	}
	return parseJsonSafe(response);
};