//const BASE_URL = 'http://192.168.1.20:8080'; //cambiar por la IP del servidor
const BASE_URL = 'http://localhost:8080'

export async function getGameInfo(nombre) {
  const response = await fetch(
    `${BASE_URL}/api/igdb/game?name=${encodeURIComponent(nombre)}`
  );

  if (!response.ok) {
    throw new Error('Error al consultar el backend de IGDB');
  }

  return response.json();
}
