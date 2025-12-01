import React from 'react'
import './Productos.css'
import { addToCart } from '../utils/cart'

const productos = [
  { titulo: 'Terraria', precio: 10000, imagen: '../public/img/terraria.jpg' },
  { titulo: 'GTA V', precio: 10000, imagen: '../public/img/gtaV.jpg' },
  { titulo: 'Left 4 Dead 2', precio: 10000, imagen: '../public/img/Left_4_dead_2.jpg' },
  { titulo: 'Outer Wilds', precio: 10000, imagen: '../public/img/Outer_Wilds.jpg' },
]

export default function Productos() {
  return (
    <main>
      <div className="contenedor-productos">
        {productos.map(p => (
          <div className="producto" key={p.titulo}>
            <img className="producto-imagen" src={p.imagen} alt={p.titulo} />
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
