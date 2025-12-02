import { useEffect, useMemo, useState } from 'react'
import './Carrito.css'

export default function Carrito() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    setCart(loadCart())
  }, [])

  useEffect(() => {
    const onCartUpdated = (e) => setCart(e?.detail ?? loadCart())
    window.addEventListener('cartUpdated', onCartUpdated)
    return () => window.removeEventListener('cartUpdated', onCartUpdated)
  }, [])
  const eliminarProducto = (index) => {
    const current = loadCart()
    current.splice(index, 1)
    saveCart(current)
    setCart(current)
  }

  const vaciarCarrito = () => {
    if (confirm('¿Vaciar carrito?')) {
      saveCart([])
      setCart([])
    }
  }

  const total = useMemo(() => cart.reduce((sum, p) => sum + (Number(p.precio) || 0) * (p.cantidad || 1), 0), [cart])

  return (
    <div className="carrito-wrapper">
      <h2>Carrito de Compras</h2>
      <div className="carrito-items">
        {cart.length === 0 && <p style={{textAlign:'center'}}>Tu carrito está vacío.</p>}
        {cart.map((producto, index) => (
          <div className="producto-carrito" key={producto.nombre + index}>
            <img src={producto.imagen} alt={producto.nombre} />
            <strong>{producto.nombre}</strong>
            <span>${Number(producto.precio).toLocaleString()}</span>
            <div>
              <span style={{ margin: '0 8px' }}>{producto.cantidad || 1}</span>
            </div>
            <button onClick={() => eliminarProducto(index)} title="Eliminar">❌</button>
          </div>
        ))}
      </div>
      <div className="carrito-total">
        Total: <span id="carrito-total">${total.toLocaleString()}</span>
      </div>
      {cart.length > 0 && (
        <div style={{textAlign:'center', marginTop:16}}>
          <button className="btnInicioSesion" onClick={vaciarCarrito}>Vaciar carrito</button>
        </div>
      )}
    </div>
  )
}
