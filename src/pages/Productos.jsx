import React from 'react'
import './Productos.css'
import { addToCart } from '../utils/cart'
import InfoProductos from '../data/InfoProductos.js'
import { Link } from 'react-router-dom'

export default function Productos() {
  return (
    <main>
      <div className="contenedor-productos">
        {InfoProductos.map(p => (
          <div className="producto" key={p.titulo}>
            <Link to={`/producto/${p.id}`}>
              <img className="producto-imagen" src={p.imagen} alt={p.titulo} />
            </Link>
            <div className="producto-detalles">
              <h3 className="producto-titulo">{p.titulo}</h3>
              <p className="producto-precio">${p.precio}</p>
              <button className="producto-agregar" onClick={()=>addToCart({ nombre: p.titulo, precio: p.precio, imagen: p.imagen })}>Agregar</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
