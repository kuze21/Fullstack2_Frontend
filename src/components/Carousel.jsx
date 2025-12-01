import { Link } from 'react-router-dom'

export default function Carousel() {
  return (
    <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner rounded shadow">
        <div className="carousel-item active">
          <Link to="/producto/1">
            <img src='../public/img/SilksongCarrusel.jpg' className="d-block w-100" alt="Juego 1" />
          </Link>
        </div>
        <div className="carousel-item">
          <img src="../public/img/grounded2Carrusel.jpg" className="d-block w-100" alt="Juego 2" />
        </div>
        <div className="carousel-item">
          <img src="../public/img/minecraft2Carrusel.jpg" className="d-block w-100" alt="Juego 3" />
        </div>
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
