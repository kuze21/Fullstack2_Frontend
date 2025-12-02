const BASE_URL = 'http://10.199.7.228:8080'; //cambiar por la IP del servidor

export async function getGameInfo(nombre) {
  const response = await fetch(
    `${BASE_URL}/api/igdb/game?name=${encodeURIComponent(nombre)}`
  );

  if (!response.ok) {
    throw new Error('Error al consultar el backend de IGDB');
  }

  return response.json();
}
