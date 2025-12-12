import React, { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './AdminPanel.css'

export default function AdminPanel() {
  const { user} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // redirecciona si no es admin
    const isAdmin = !!user && (
      user.rol === 'ROLE_ADMIN'
    )
    if (!isAdmin) navigate('/')
  }, [user, navigate])
  

  return (
    <div>
      <h2 className="txtWelcome">Bienvenido al panel de control</h2>
      <div className="container-buttons">
        <div className="container-btnUsers">
          <button className="btn" onClick={() => navigate('/administrar-usuarios')}>
            Adminstracion de Usuarios
          </button>
        </div>
        <div className="container-btnProducts">
          <button className="btn" onClick={() => navigate('/agregar-producto')}>
            Adminstracion de Productos
          </button>
        </div>
      </div>
    </div>
  )
}
