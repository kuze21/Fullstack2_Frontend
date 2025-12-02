import { Link } from 'react-router-dom'
import './Carousel.css'
import { useEffect, useState } from 'react'
import { obtenerProductos } from '../services/producto.js'

export default function Carousel() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function cargar() {
      try {
        const data = await obtenerProductos()
        setProductos(data)
      } catch (e) {
        console.error(e)
        setError('No se pudieron cargar los productos del carrusel')
      } finally {
        setCargando(false)
      }
    }

    cargar()
  }, [])

  if (cargando || !productos.length) {
    return null
  }

  // Elegimos 3 productos aleatorios
  const productosRandom = [...productos]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

  return (
    <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner rounded shadow">

        {productosRandom.map((prod, index) => (
          <div
            key={prod.id}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
          >
            <Link to={`/producto/${prod.id}`}>
              <div className="carousel-image-wrapper">
              <img
                src={prod.url_imagen}
                className="carousel-image"
                alt={prod.nombre}
              />
              </div>
            </Link>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  )
}
