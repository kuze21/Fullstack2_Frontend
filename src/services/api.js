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