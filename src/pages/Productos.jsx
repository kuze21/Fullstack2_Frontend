import React, { useEffect, useState } from 'react'
import './Productos.css'
import { Link } from 'react-router-dom'
import { obtenerProductos } from '../services/producto.js'

export default function Productos() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function cargar() {
      try {
        const data = await obtenerProductos()
        setProductos(data)
      } catch (err) {
        console.error(err)
        setError('No se pudieron cargar los productos')
      } finally {
        setCargando(false)
      }
    }

    cargar()
  }, [])

  if (cargando) {
    return (
      <main>
        <p>Cargando productos...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main>
        <p style={{ color: 'red' }}>{error}</p>
      </main>
    )
  }

  return (
    <main>
      <div className="contenedor-productos">
        {productos.map(p => (
          <div className="producto" key={p.id}>
            <Link to={`/producto/${p.id}`}>
              <img className="producto-imagen" src={p.url_imagen} alt={p.nombre} />
            </Link>
            <div className="producto-detalles">
              <h3 className="producto-titulo">{p.nombre}</h3>
              <p className="producto-precio">${p.precio}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
