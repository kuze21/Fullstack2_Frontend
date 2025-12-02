import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import "./Header.css"

export default function Header() {
  const navigate = useNavigate()
  const { token, user, logout } = useAuth()
  const isAuthenticated = !!token
  const isAdmin = (() => {
    if (!user) return false
    // roles as array of strings
    if (Array.isArray(user.roles) && user.roles.includes('ADMIN')) return true
    // role fields
    if (user?.rol === 'ADMIN' || user?.role === 'ADMIN') return true
    // authorities could be array of strings or objects like { authority: 'ROLE_ADMIN' }
    if (Array.isArray(user.authorities)) {
      if (user.authorities.includes('ROLE_ADMIN')) return true
      if (user.authorities.some(a => a && (a.authority === 'ROLE_ADMIN' || a === 'ROLE_ADMIN'))) return true
    }
    return false
  })()
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
          </>
        ) : (
          <button type="button" className="btnInicioSesion" onClick={() => navigate('/login')} aria-label="Iniciar sesión">
            <img src="/img/usuario.png" width="30" height="30" alt="Usuario" />
          </button>
        )}

        <button type="button" className="btnInicioSesion" onClick={() => navigate('/carrito')} aria-label="Ver carrito">
          <img src="/img/shopping-cart.png" width="30" height="30" alt="Carrito" />
        </button>
        <button type="button" className="btnInicioSesion" onClick={() => navigate('/agregar-producto')} aria-label="Agregar producto">
          <img src="/img/shopping-cart.png" width="30" height="30" alt="Agregar producto" />
        </button>
      </div>
    </header>
  )
}
