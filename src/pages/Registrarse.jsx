import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Registrarse.css'
import { registerUser } from '../services/api'
import { useAuth } from '../context/AuthContext'

//limpia el rut y lo deja en mayusculas sin puntos ni guion
function normalizeRut(rutStr) {
  if (!rutStr) return ''
  return rutStr.replace(/[.\-]/g, '').trim().toUpperCase()
}

//digito verificador
function computeDV(body) {
  let sum = 0, mul = 2
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i], 10) * mul
    mul = mul === 7 ? 2 : mul + 1
  }
  const mod = 11 - (sum % 11)
  if (mod === 11) return '0'
  if (mod === 10) return 'K'
  return String(mod)
}

//valida cuerpo del rut y dv
function validateRut(rutStr) {
  const clean = normalizeRut(rutStr)
  if (clean.length < 2) return false
  const body = clean.slice(0, -1)
  const dv = clean.slice(-1)
  if (!/^\d+$/.test(body)) return false
  return computeDV(body) === dv
}

//formatea el rut con puntos y guion
function formatRut(rutStr) {
  const clean = normalizeRut(rutStr)
  if (clean.length < 2) return clean
  const body = clean.slice(0, -1)
  const dv = clean.slice(-1)
  const rev = body.split('').reverse().join('')
  const chunks = rev.match(/.{1,3}/g) || []
  const withDots = chunks.map(c => c.split('').reverse().join('')).reverse().join('.')
  return `${withDots}-${dv}`
}

export default function Registrarse() {
  const navigate = useNavigate()//se redirige al login despues de registrarse
  const { login } = useAuth()

  const [form, setForm] = useState({
    mail: '',
    rut: '',
    nombres: '',
    apellidos: '',
    password: '',
  })

  const [errors, setErrors] = useState({})
  const [formMsg, setFormMsg] = useState('')

  //validacion por campo
  const validateField = (name, value) => {
    const val = (value ?? '').toString()

    if (name === 'user') {
      if (!val.trim()) return 'El usuario es obligatorio.'
    }
    if (name === 'nombres') {
      if (!val.trim()) return 'El nombre es obligatorio.'
    }
    if (name === 'apellidos') {
      if (!val.trim()) return 'El apellido es obligatorio.'
    }
    if (name === 'mail') {
      if (!val.trim()) return 'El correo es obligatorio.'
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!regex.test(val)) return 'Correo inválido.'
      const dominio = val.split('@')[1]?.toLowerCase()
      const permitidos = ['duocuc.cl']
      if (!permitidos.includes(dominio)) return 'Solo se permite duocuc.cl.'
    }
    if (name === 'rut') {
      if (!val.trim()) return 'El RUT es obligatorio.'
      if (!validateRut(val)) return 'RUT inválido.'
    }
    if (name === 'password') {
      if (!val) return 'La contraseña es obligatoria.'
      if (val.length < 8) return 'La contraseña debe tener al menos 8 caracteres.'
    }

    return ''
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setForm(s => ({ ...s, [name]: value }))
    const err = validateField(name, value)
    setErrors(s => ({ ...s, [name]: err }))
    setFormMsg('')
  }

  const handleRutBlur = () => {
    if (!form.rut) return
    const formatted = formatRut(form.rut)
    setForm(s => ({ ...s, rut: formatted }))
    const err = validateField('rut', formatted)
    setErrors(s => ({ ...s, rut: err }))
  }

  const validateAll = () => {
    const next = {}
    for (const n of Object.keys(form)) {
      const err = validateField(n, form[n])
      if (err) next[n] = err
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateAll()) {
      setFormMsg('Corrige los errores antes de continuar.')
      return
    }

    const userData = {
      correo: form.mail.trim().toLowerCase(),
      rut: form.rut,
      nombres: form.nombres.trim(),
      apellidos: form.apellidos.trim(),
        password: form.password,
    }

    try {
      setFormMsg('Registrando...')
      const response = await registerUser(userData)

      login(response.token)

      setFormMsg('¡Registro exitoso! Redirigiendo...')
      setTimeout(() => navigate('/'), 2000)

    } catch (error) {
      setFormMsg(error.message || 'Ocurrió un error en el registro.')
      console.error(error)
    }
  }

  return (
    <div className="container-login-form">
      <form className="form-registro" onSubmit={handleSubmit} noValidate>
        <button type="submit" style={{ display: 'none' }} aria-hidden="true" />
        <div className="form-div-registro">

          <label htmlFor="mail">Correo</label>
          <input
            type="email"
            id="mail"
            placeholder="Ingrese correo electrónico"
            name="mail"
            value={form.mail}
            onChange={onChange}
            required
          />
          <small className="msg-error">{errors.mail}</small>
          <small className="hint-text">
            Use su correo institucional que termine en <strong>@duocuc.cl</strong>.
          </small>

          <label htmlFor="rut">RUT</label><br />
          <input
            type="text"
            id="rut"
            placeholder="12.345.678-5"
            name="rut"
            value={form.rut}
            onChange={onChange}
            onBlur={handleRutBlur}
            required
          />
          <small className="msg-error">{errors.rut}</small><br />

          <label htmlFor="fname">Nombre</label><br />
          <input
            type="text"
            id="fname"
            placeholder="Ingrese su nombre"
            name="nombres"
            value={form.nombres}
            onChange={onChange}
            required
          />
          <small className="msg-error">{errors.nombres}</small><br />
          <label htmlFor="apellidos">Apellido</label><br />
          <input
            type="text"
            id="apellidos"
            placeholder="Ingrese su apellido"
            name="apellidos"
            value={form.apellidos}
            onChange={onChange}
            required
          />
          <small className="msg-error">{errors.apellidos}</small><br />
          <label htmlFor="password">Contraseña</label><br />
          <div className="password-wrapper">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingrese contraseña"
              value={form.password}
              onChange={onChange}
              required
              minLength={8}
            />
          </div>
          <small className="msg-error">{errors.password}</small><br />

          <div className="form-register-buttons">
            <button type="submit" className="register-btn">Registrarse</button>
            <Link to="/Login" className="register-btn">
              Iniciar Sesion
            </Link>
          </div>

          <p className="msg-form">{formMsg}</p>
        </div>
      </form>
    </div>
  )
}
