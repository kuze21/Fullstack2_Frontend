import { Link } from 'react-router-dom'
import InfoProductos from "../data/InfoProductos.js";
import './Carousel.css'

export default function Carousel() {

  const productosRandom = [...InfoProductos].sort(() => Math.random() - 0.5).slice(0, 3);

  return (
    <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner rounded shadow">

      {productosRandom.map((prod, index) => (
          <div 
            key={prod.id}
            className={`carousel-item ${index === 0 ? "active" : ""}`}>
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
      <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  )
}
