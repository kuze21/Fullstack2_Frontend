import React from 'react'
import './Productos.css'
import InfoProductos from '../data/InfoProductos.js'
import { Link } from 'react-router-dom'

export default function Productos() {
  return (
    <main>
      <div className="contenedor-productos">
        {InfoProductos.map(p => (
          <div className="producto" key={p.nombre}>
            <Link to={`/producto/${p.id}`}>
              <img className="producto-imagen" src={p.imagen} alt={p.nombre} />
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
