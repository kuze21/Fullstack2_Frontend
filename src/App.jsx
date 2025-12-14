import { Routes, Route, Navigate } from 'react-router-dom'

import Layout from './components/Layout.jsx'

import MenuPrincipal from './pages/MenuPrincipal.jsx';
import Login from './pages/Login.jsx';
import Productos from "./pages/Productos.jsx";
import DetalleProducto from "./pages/DetalleProducto.jsx";
import AgregarProducto from "./pages/AgregarProducto.jsx";
import Registrarse from "./pages/Registrarse.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import Carrito from "./pages/Carrito.jsx";

/*

import Login from "./pages/Login.jsx";
import Formulario from "./pages/Formulario.jsx";
import MapaSitio from "./pages/MapaSitio.jsx";
import Registrarse from "./pages/Registrarse.jsx"
import RutaAdmin from "./components/RutaAdmin.jsx";
import RutaProtegida from "./components/RutaProtegida.jsx";
*/

function App() {
  return (
    <Routes>
      <Route element={<Layout><MenuPrincipal /></Layout>} path="/" />
      <Route element={<Layout><Productos /></Layout>} path="/productos" />
      <Route element={<Layout><DetalleProducto /></Layout>} path="/producto/:id" />
      <Route element={<Layout><Login /></Layout>} path="/login" />
      <Route element={<Layout><AgregarProducto /></Layout>} path="/agregar-producto" />
      <Route element={<Layout><Registrarse /></Layout>} path="/registrarse" />
      <Route element={<Layout><AdminPanel /></Layout>} path="/admin" />
      <Route element={<Layout><Carrito /></Layout>} path="/carrito" />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App;

/*
      <Route element={<Layout><RoutesIndex.InicioSesion /></Layout>} path="/login" />
      <Route element={<Layout><RoutesIndex.Carrito /></Layout>} path="/carrito" />
      <Route element={<Layout><RoutesIndex.Blogs /></Layout>} path="/blogs" />
      <Route element={<Layout><RoutesIndex.Registro /></Layout>} path="/registro" />
*/
      {/* Admin (also wrapped for consistent header/footer; adjust if needed) */}
/*
      <Route element={<Layout><RoutesIndex.Admin /></Layout>} path="/admin" />
      <Route element={<Layout><RoutesIndex.AdminUsuario /></Layout>} path="/admin/usuario" />
      <Route element={<Layout><RoutesIndex.AdminProducto /></Layout>} path="/admin/producto" />
      <Route element={<Layout><RoutesIndex.AdminAgregarUsuario /></Layout>} path="/admin/agregar-usuario" />
      <Route element={<Layout><RoutesIndex.AdministrarUsuarios /></Layout>} path="/admin/administrar-usuarios" />
*/