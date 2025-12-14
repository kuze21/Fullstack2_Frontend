import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchUsuarios, eliminarUsuario, cambiarRolUsuario } from '../services/api';
import './AdministrarUsuarios.css';

export default function AdministrarUsuarios() {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const isAdmin = !!user && user.rol === 'ROLE_ADMIN';
    if (!isAdmin) {
      navigate('/');
      return;
    }
    cargarUsuarios();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function cargarUsuarios() {
    try {
      setCargando(true);
      const data = await fetchUsuarios(token);
      setUsuarios(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message || 'No se pudieron cargar los usuarios');
    } finally {
      setCargando(false);
    }
  }

  async function handleEliminar(id) {
    if (!confirm('¿Seguro que deseas eliminar este usuario?')) return;
    try {
      await eliminarUsuario(id, token);
      setUsuarios(prev => prev.filter(u => u.id !== id));
      alert('Usuario eliminado');
    } catch (err) {
      console.error(err);
      alert(err.message || 'Error al eliminar usuario');
    }
  }

  async function handleRol(id, nuevoRol) {
    try {
      await cambiarRolUsuario(id, nuevoRol, token);
      setUsuarios(prev => prev.map(u => u.id === id ? { ...u, rol: nuevoRol } : u));
      alert('Rol actualizado');
    } catch (err) {
      console.error(err);
      alert(err.message || 'Error al actualizar rol');
    }
  }

  if (cargando) {
    return <main><p>Cargando usuarios...</p></main>;
  }

  if (error) {
    return <main><p style={{ color: 'red' }}>{error}</p></main>;
  }

  return (
    <main>
      <div className="contenedor-usuarios">
        {usuarios.length === 0 ? (
          <p>No hay usuarios</p>
        ) : (
          usuarios.map(u => (
            <div className="usuario" key={u.id}>
              <div className="usuario-detalles">
                <h3 className="usuario-nombre">{(u.nombres && u.apellidos) ? `${u.nombres} ${u.apellidos}` : (u.name || u.username || u.correo || u.email)}</h3>
                <p className="usuario-email">{u.correo || u.email}</p>
                <div className="usuario-rol">
                  <label>Rol:</label>
                  <select
                    value={u.rol}
                    onChange={(e) => handleRol(u.id, e.target.value)}
                  >
                    <option value="ROLE_USER">Usuario</option>
                    <option value="ROLE_ADMIN">Admin</option>
                  </select>
                </div>
              </div>
              <div className="usuario-botones">
                <button className="usuario-eliminar" onClick={() => handleEliminar(u.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
