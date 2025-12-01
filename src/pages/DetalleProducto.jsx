import { useParams } from 'react-router-dom'
import './DetalleProducto.css'

export default function Producto() {
  const { id } = useParams()
  return (
    <main style={{ padding: 24 }}>
      <h1>Producto #{id}</h1>
      <p>Detalle de un producto (placeholder).</p>
    </main>
  )
}
