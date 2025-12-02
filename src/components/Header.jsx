import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import "./Header.css"

export default function Header() {
  const navigate = useNavigate()
  const { token, user, logout } = useAuth()
  
  const isAuthenticated = Boolean(token)
  const isAdmin = Boolean(
    user &&
      (user.role === 'admin' ||
        user.roles?.includes?.('admin') ||
        user.isAdmin)
  )
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
        {isAuthenticated ? (
          <>
            <button className="btnInicioSesion" onClick={() => navigate(isAdmin ? '/admin' : '/profile')}>
              {`Hola ${user?.nombres || user?.name || user?.preferred_username || user?.username || user?.correo || user?.email || 'Perfil'}`}
            </button>
            {isAdmin && (
              <button className="btnInicioSesion" onClick={() => navigate('/admin')} style={{ marginLeft: 8 }}>
                Panel
              </button>
            )}
            <button className="btnInicioSesion" onClick={() => { logout(); navigate('/'); }} title="Cerrar sesión">
              Cerrar Sesión
            </button>
            <button type="button" className="btnInicioSesion" onClick={() => navigate('/agregar-producto')} aria-label="Agregar producto">
          <img src="/img/shopping-cart.png" width="30" height="30" alt="Agregar producto" />
        </button>
          </>
        ) : (
          <button type="button" className="btnInicioSesion" onClick={() => navigate('/login')} aria-label="Iniciar sesión">
            <img src="/img/usuario.png" width="30" height="30" alt="Usuario" />
          </button>
        )}
      </div>
    </header>
  )
}
