import { useParams } from 'react-router-dom'
import InfoProductos from '../data/InfoProductos.js'
import './DetalleProducto.css'

export default function Producto() {
  const { id } = useParams()
  const producto = InfoProductos.find(p => p.id === Number(id))

  if (!producto) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Producto no encontrado</h1>
        <p>No existe un producto con el ID {id}.</p>
      </main>
    )
  }

  return (
    <main className="producto-detalle">
      <img className="producto-img" src={producto.imagen} alt={producto.titulo} />

      <div className="producto-info">
        <h1>{producto.titulo}</h1>
        <p className="descripcion">{producto.descripcion}</p>
        <p className="precio">${producto.precio}</p>
        <button className="btn-comprar">Agregar al carrito</button>
      </div>
    </main>
  )
}
