import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './PanelProducts.css'

export default function PanelProducts() {
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
    <div className="">
      <h2 className="txtWelcome">Panel de Administración de Productos</h2>
      <div className="container-buttons">
        <div className="container-btnProducts">
            <button className="btn" onClick={() => navigate('/agregar-producto')}>Agregar Producto</button>
        </div>
        <div className="container-btnProducts">
            <button className="btn" onClick={() => navigate('/modificar-producto')}>Modificar producto</button>
        </div>
      </div>
    </div>
  )
}