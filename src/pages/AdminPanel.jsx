import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { fetchUsuarios, fetchProductos, eliminarUsuario, eliminarProducto, cambiarRolUsuario } from '../services/api'

export default function AdminPanel() {
  const { user, token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // redirect if not admin
    const isAdmin = !!user && (
      (Array.isArray(user.roles) && user.roles.includes('ADMIN')) ||
      user?.rol === 'ADMIN' ||
      (Array.isArray(user.authorities) && user.authorities.includes('ROLE_ADMIN')) ||
      user?.role === 'ADMIN'
    )
    if (!isAdmin) navigate('/')
  }, [user, navigate])
  const [usuarios, setUsuarios] = useState([])
  const [productos, setProductos] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token) return
    let mounted = true

    const loadUsers = async () => {
      setLoadingUsers(true)
      try {
        const data = await fetchUsuarios(token)
        if (mounted) setUsuarios(Array.isArray(data) ? data : [])
      } catch (err) {
        if (mounted) setError(err.message || String(err))
      } finally {
        if (mounted) setLoadingUsers(false)
      }
    }

    const loadProducts = async () => {
      setLoadingProducts(true)
      try {
        const data = await fetchProductos()
        if (mounted) setProductos(Array.isArray(data) ? data : [])
      } catch (err) {
        if (mounted) setError(err.message || String(err))
      } finally {
        if (mounted) setLoadingProducts(false)
      }
    }

    loadUsers()
    loadProducts()

    return () => { mounted = false }
  }, [token])

  const handleEliminarUsuario = async (id) => {
    if (!token) return setError('Token no disponible')
    if (!window.confirm('¿Eliminar usuario? Esta acción no se puede deshacer.')) return
    try {
      await eliminarUsuario(id, token)
      setUsuarios(prev => prev.filter(u => u.id !== id))
    } catch (err) {
      setError(err.message || String(err))
    }
  }

  const handleToggleAdmin = async (u) => {
    if (!token) return setError('Token no disponible')
    const isAdmin = (Array.isArray(u.roles) && u.roles.includes('ADMIN')) || (Array.isArray(u.authorities) && u.authorities.includes('ROLE_ADMIN')) || u?.role === 'ADMIN' || u?.rol === 'ADMIN'
    const nuevoRol = isAdmin ? 'ROLE_USER' : 'ROLE_ADMIN'
    const confirmMsg = isAdmin ? `Quitar rol de administrador a ${u.nombre || u.username || u.email}?` : `Dar rol de administrador a ${u.nombre || u.username || u.email}?`
    if (!window.confirm(confirmMsg)) return
    try {
      await cambiarRolUsuario(u.id, nuevoRol, token)
      // actualizar estado localmente si es posible
      setUsuarios(prev => prev.map(item => item.id === u.id ? ({ ...item, role: nuevoRol === 'ROLE_ADMIN' ? 'ADMIN' : 'USER', rol: nuevoRol === 'ROLE_ADMIN' ? 'ADMIN' : 'USER', authorities: nuevoRol === 'ROLE_ADMIN' ? (item.authorities || []).concat('ROLE_ADMIN') : (item.authorities || []).filter(a => (a.authority || a) !== 'ROLE_ADMIN') }) : item))
    } catch (err) {
      setError(err.message || String(err))
    }
  }

  const handleEliminarProducto = async (id) => {
    if (!token) return setError('Token no disponible')
    if (!window.confirm('¿Eliminar producto?')) return
    try {
      await eliminarProducto(id, token)
      setProductos(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      setError(err.message || String(err))
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Panel de Control (Admin)</h2>
      <p>Bienvenido al panel de administración. Aquí puedes gestionar la aplicación.</p>

      {error && (
        <div style={{ color: 'crimson', marginBottom: 12 }}>Error: {error}</div>
      )}

      <section style={{ marginBottom: 24 }}>
        <h3>Usuarios Registrados</h3>
        {loadingUsers ? (
          <div>Cargando usuarios...</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>ID</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Nombre / Email</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Roles / Authorities</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 && (
                <tr><td colSpan={3}>No hay usuarios registrados.</td></tr>
              )}
              {usuarios.map(u => (
                <tr key={u.id}>
                  <td style={{ padding: '8px 4px', borderBottom: '1px solid #f0f0f0' }}>{u.id}</td>
                  <td style={{ padding: '8px 4px', borderBottom: '1px solid #f0f0f0' }}>{u.nombre || u.name || u.nombres || u.username || u.email || u.correo}</td>
                  <td style={{ padding: '8px 4px', borderBottom: '1px solid #f0f0f0' }}>{
                    Array.isArray(u.roles) ? u.roles.join(', ') : (Array.isArray(u.authorities) ? u.authorities.map(a => (a.authority || a)).join(', ') : (u.role || u.rol || '-'))
                  }</td>
                  <td style={{ padding: '8px 4px', borderBottom: '1px solid #f0f0f0' }}>
                    <button style={{ marginRight: 8 }} onClick={() => handleToggleAdmin(u)}>{((Array.isArray(u.roles) && u.roles.includes('ADMIN')) || (Array.isArray(u.authorities) && u.authorities.includes('ROLE_ADMIN')) || u?.role === 'ADMIN' || u?.rol === 'ADMIN') ? 'Quitar Admin' : 'Dar Admin'}</button>
                    <button onClick={() => handleEliminarUsuario(u.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h3>Productos</h3>
        {loadingProducts ? (
          <div>Cargando productos...</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>ID</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Título</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Precio</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Descripción</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.length === 0 && (
                <tr><td colSpan={5}>No hay productos.</td></tr>
              )}
              {productos.map(p => (
                <tr key={p.id}>
                  <td style={{ padding: '8px 4px', borderBottom: '1px solid #f0f0f0' }}>{p.id}</td>
                  <td style={{ padding: '8px 4px', borderBottom: '1px solid #f0f0f0' }}>{p.titulo || p.nombre || p.title || p.nombreProducto || '-'}</td>
                  <td style={{ padding: '8px 4px', borderBottom: '1px solid #f0f0f0' }}>{p.precio ?? p.price ?? '-'}</td>
                  <td style={{ padding: '8px 4px', borderBottom: '1px solid #f0f0f0' }}>{p.descripcion || p.descripcionProducto || p.description || '-'}</td>
                  <td style={{ padding: '8px 4px', borderBottom: '1px solid #f0f0f0' }}>
                    <button onClick={() => handleEliminarProducto(p.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}
