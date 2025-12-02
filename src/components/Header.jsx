import { useNavigate } from 'react-router-dom'
import "./Header.css"

export default function Header() {
  const navigate = useNavigate()
  return (
    <header>
      <div>
        <h1 style={{ textAlign: 'left' }}>
          {/* Logo */}
          <a href="#" onClick={(e)=>{e.preventDefault(); navigate('/') }}>
            <img src="/img/arkadium.png" alt="Arkadium logo" />
          </a>
        </h1>
      </div>
      <div id="menu">
        <menu>
          <li><a href="#" onClick={(e)=>{e.preventDefault(); navigate('/') }}>Home</a></li>
          <li><a href="#" onClick={(e)=>{e.preventDefault(); navigate('/productos') }}>Productos</a></li>
          <li><a href="#" onClick={(e)=>{e.preventDefault(); alert('Arkadium') }}>Nosotros</a></li>
          <li><a href="#" onClick={(e)=>{e.preventDefault(); alert('+56912345678') }}>Contacto</a></li>
        </menu>
      </div>
      <div className="InicioSesion">
        <button className="btnInicioSesion" onClick={()=>navigate('/login')}>
          <img src="../public/img/usuario.png" width="30" height="30" />
        </button>
        <button className="btnInicioSesion" onClick={()=>navigate('/carrito')}>
          <img src="../public/img/shopping-cart.png" width="30" height="30" />
        </button>
        <button className="btnInicioSesion" onClick={()=>navigate('/agregar-producto')}>
          <img src="../public/img/shopping-cart.png" width="30" height="30" />
        </button>
      </div>
    </header>
  )
}
