import './MenuPrincipal.css'
import Carousel from '../components/Carousel'
import { addToCart } from '../utils/cart'
import InfoProductos from '../data/InfoProductos.js'
import { Link } from 'react-router-dom'

export default function MenuPrincipal() {
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
        <h2>Juegos</h2>
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
    </>
  )
}
