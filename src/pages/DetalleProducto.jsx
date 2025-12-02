import { useParams } from 'react-router-dom'
import InfoProductos from '../data/InfoProductos.js'
import './DetalleProducto.css'
import { useEffect, useState } from 'react'
import { getGameInfo } from '../services/igdb.js'

export default function Producto() {
  const { id } = useParams()
  const producto = InfoProductos.find(p => p.id === Number(id))

  const [igdbData, setIgdbData] = useState(null)

  useEffect(() => {
    if (!producto) return;

    getGameInfo(producto.nombre)
      .then(data => setIgdbData(data))
      .catch(() => setIgdbData(null))
  }, [producto])

  if (!producto) return <h1>Producto no encontrado</h1>

  return (
    <main className="producto-detalle">
      <img className="producto-img" src={producto.url_imagen} alt={producto.nombre} />

      <div className="producto-info">
        <h1>{producto.nombre}</h1>
        <p className="descripcion">{producto.descripcion}</p>
        <p className="precio">${producto.precio}</p>

        {igdbData && (
          <div className="igdb">
            <h2>Información del Juego</h2>
            <p><strong>Resumen:</strong> {igdbData.summary}</p>
            <p><strong>Géneros:</strong> {igdbData.genres?.join(", ")}</p>
            <p><strong>Tipo de juego:</strong> {igdbData.gameType}</p>
          </div>
        )}

        <button className="btn-comprar">Agregar al carrito</button>
      </div>
    </main>
  )
}
