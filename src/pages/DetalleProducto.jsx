import { useParams } from 'react-router-dom'
import './DetalleProducto.css'
import { useEffect, useState } from 'react'
import { obtenerProducto } from '../services/producto.js'
import { obtenerCarrito, agregarAlCarrito } from "../services/carrito.js";
import { getGameInfo } from '../services/igdb.js'

export default function Producto() {
  const { id } = useParams()

  const [producto, setProducto] = useState(null)
  const [igdbData, setIgdbData] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [enCarrito, setEnCarrito] = useState(false);
  const [msgCarrito, setMsgCarrito] = useState(null);
  const [cargandoCarrito, setCargandoCarrito] = useState(false)

  useEffect(() => {
    let cancelado = false

    async function cargar() {
      try {
        setCargando(true)
        setError(null)
        setMsgCarrito(null)
        setEnCarrito(false)

        // 1) Producto desde tu API
        const data = await obtenerProducto(id)
        if (!cancelado) {
          setProducto(data)

          try {
            const carrito = await obtenerCarrito()
            const ids = new Set((carrito.items || []).map(item => String(item.id)))
            setEnCarrito(ids.has(String(data.id)))
          } catch (e) {
            console.log('Error al obtener carrito', e);
          }

          // 2) Info extra desde IGDB usando el nombre
          try {
            const igdb = await getGameInfo(data.nombre)
            if (!cancelado) setIgdbData(igdb)
          } catch (e) {
            console.error('Error al obtener info de IGDB', e)
          }
        }
      } catch (e) {
        console.error(e)
        if (!cancelado) setError('No se pudo cargar el producto')
      } finally {
        if (!cancelado) setCargando(false)
      }
    }

    cargar()

    return () => {
      cancelado = true
    }
  }, [id])

   async function handleAgregarCarrito() {
    if (!producto) return

    // si ya está, no hacemos nada
    if (enCarrito) {
      setMsgCarrito("Este juego ya está en tu carrito.")
      return
    }

    try {
      setCargandoCarrito(true)
      setMsgCarrito(null)

      const carrito = await agregarAlCarrito(producto.id)

      // el backend devuelve items + total
      const ids = new Set((carrito.items || []).map(item => String(item.id)))
      setEnCarrito(ids.has(String(producto.id)))

      setMsgCarrito("Agregado al carrito.")
    } catch (e) {
      console.error(e)

      // si tu backend responde 401/403 cuando no hay token
      setMsgCarrito("Debes iniciar sesión para agregar al carrito.")
    } finally {
      setCargandoCarrito(false)
    }
  }

  if (cargando) {
    return (
      <main>
        <p>Cargando producto...</p>
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

  if (!producto) {
    return (
      <main>
        <p>Producto no encontrado</p>
      </main>
    )
  }

  return (
    <main className="detalle-producto">
      <div className="detalle-contenido">
        <img
          className="detalle-imagen"
          src={producto.url_imagen}
          alt={producto.nombre}
        />

        <div className="detalle-info">
          <h1>{producto.nombre}</h1>
          <p className="detalle-precio">${producto.precio}</p>

          {producto.descripcion && (
            <p className="detalle-descripcion">{producto.descripcion}</p>
          )}

          <button
            className="btn-comprar"
            onClick={handleAgregarCarrito}
            disabled={cargandoCarrito || enCarrito}
            title={enCarrito ? "Ya está en el carrito" : "Agregar al carrito"}
          >
            {cargandoCarrito
              ? "Agregando..."
              : enCarrito
                ? "En el carrito"
                : "Agregar al carrito"}
          </button>
          {msgCarrito && <p style={{ marginTop: 10 }}>{msgCarrito}</p>}
        </div>
      </div>

      {igdbData && (
        <div className="igdb">
          <h2>Información del Juego</h2>
          <p><strong>Resumen:</strong> {igdbData.summary}</p>
          <p><strong>Géneros:</strong> {igdbData.genres?.join(', ')}</p>
          <p><strong>Tipo de juego:</strong> {igdbData.gameType}</p>
        </div>
      )}
    </main>
  )
}
