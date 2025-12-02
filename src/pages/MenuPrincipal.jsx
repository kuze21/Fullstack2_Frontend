import './MenuPrincipal.css'
import Carousel from '../components/Carousel'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { obtenerProductos } from '../services/producto.js'


export default function MenuPrincipal() {
  const [productos, setProductos] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    async function cargar() {
      try {
        const data = await obtenerProductos()
        setProductos(data)
      } catch (e) {
        console.error(e)
        setError('No se pudieron cargar los productos destacados')
      }
    }

    cargar()
  }, [])

  const destacados = productos.slice(0, 7);

  return (
    <>
      <section className="container-fluid bg-light p-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <h2 className="fw-bold" style={{ color: 'black' }}>ARKADIUM</h2>
            <p className="text-muted">
              Nuestra tienda ofrece una gran variedad de videojuegos digitales.
              Descarga cualquiera de nuestros catálogos de forma gratuita ahora mismo.
            </p>
          </div>
          <div className="col-md-6" style={{ marginTop: 80 }}>
            <Carousel />
          </div>
        </div>
      </section>

      <main>
        <h2 style={{ marginTop: '20px' }}>Juegos</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="contenedor-productos">
          {destacados.map(p => (
            <div className="producto" key={p.id}>
              <Link to={`/producto/${p.id}`}>
                <img className="producto-imagen" src={p.url_imagen} alt={p.nombre} />
              </Link>
              <div className="producto-detalles">
                <h3 className="producto-titulo">{p.nombre}</h3>
                <p className="producto-precio">${p.precio}</p>
                <button className="producto-agregar">
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
