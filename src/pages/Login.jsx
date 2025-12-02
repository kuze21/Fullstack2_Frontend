import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/api'
import { useAuth } from '../context/AuthContext'
import './Login.css'

const Login = () => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)

  const { login } = useAuth()

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.state?.email) setUser(location.state.email)
  }, [location.state])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user || !password) {
      setError('Ambos campos son obligatorios.')
      return
    }
    setError('')

    try {
      const credentials = { correo: user, password: password }
      const response = await loginUser(credentials)
      
      console.log("Respuesta del Backend:", response); // Para depuración

      // --- CORRECCIÓN CLAVE AQUÍ ---
      // 1. Normalizamos la respuesta (por si usas axios, el body real está en .data)
      const data = response.data || response;

      // 2. Buscamos el campo exacto que definiste en Java: "access_token"
      // Agregamos fallbacks por si acaso, pero "access_token" es el principal.
      const token = data.access_token || data.accessToken || data.token;

      if (!token) {
        throw new Error('Credenciales válidas, pero no se recibió el token de acceso.')
      }
      
      login(token, remember)
      navigate('/')
    } catch (err) {
      console.error(err)
      setError(err.message || 'Ocurrió un error al iniciar sesión.')
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ marginTop: '150px' }}>
      <form className="form-login p-4" onSubmit={handleSubmit} noValidate>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        {error && (
          <div role="alert" className="alert alert-danger text-center mb-3">{error}</div>
        )}
        <div className="mb-3">
          <label htmlFor="user" className="form-label">Correo</label>
          <input
            type="text"
            id="user"
            name="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="form-control"
            placeholder="Ingrese correo electrónico"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>

          <div className="password-wrapper d-flex align-items-center">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Ingrese contraseña"
              required
            />
          </div>
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary login-btn">Iniciar Sesión</button>
          <Link to="/registrarse" className="btn btn-secondary login-btn">Registrarse</Link>
        </div>
      </form>
    </div>
  )
}

export default Login