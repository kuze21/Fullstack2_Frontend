import { useState, useEffect } from "react";
import { obtenerProductos, obtenerProducto, actualizarProducto, eliminarProducto } from "../services/producto.js";
import { useNavigate, useParams } from "react-router-dom";
import "./ModificarProducto.css";


export default function ModificarProducto() {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [url_imagen, setUrlImagen] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    cargarProductos();
  }, []);

  useEffect(() => {
    if (id) {
      cargarProducto(id);
    }
  }, [id]);

  async function cargarProductos() {
    try {
      setCargando(true);
      const data = await obtenerProductos();
      setProductos(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setCargando(false);
    }
  }

  async function cargarProducto(idProducto) {
    try {
      setCargando(true);
      const producto = await obtenerProducto(idProducto);
      setProductoSeleccionado(producto);
      setNombre(producto.nombre);
      setPrecio(producto.precio);
      setStock(producto.stock);
      setUrlImagen(producto.url_imagen || "");
    } catch (error) {
      console.error("Error al cargar producto:", error);
      alert("Error al cargar el producto");
    } finally {
      setCargando(false);
    }
  }

  function modificarProducto(producto) {
    navigate(`/modificar-producto/${producto.id}`);
  }

  async function eliminar(idProducto) {
    if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      return;
    }

    try {
      await eliminarProducto(idProducto);
      alert("Producto eliminado correctamente");
      cargarProductos();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert(`Error al eliminar el producto: ${error.message}`);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const precioNum = Number(precio);
    const stockNum = Number(stock);

    // Validar que precio y stock no sean negativos
    if (precioNum < 0) {
      alert("El precio no puede ser negativo");
      return;
    }
    if (stockNum < 0) {
      alert("El stock no puede ser negativo");
      return;
    }

    const actualizado = { nombre, precio: precioNum, stock: stockNum, url_imagen };

    try {
      await actualizarProducto(productoSeleccionado.id, actualizado);
      alert("Producto actualizado correctamente");
      await cargarProductos();
      setProductoSeleccionado(null);
      navigate("/modificar-producto");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar el producto");
    }
  }

  // Si hay un ID en la URL, mostrar el formulario de edición
  if (id && productoSeleccionado) {
    return (
      <main className="main">
        <div className="header-form">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/modificar-producto') }} className="btn-back">
            <img src="/img/flechas-izquierda.png" alt="Volver" />
          </a>
          <h2>Modificar Producto</h2>
        </div>

        {cargando ? (
          <p>Cargando...</p>
        ) : (
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="URL Imagen"
              value={url_imagen}
              onChange={(e) => setUrlImagen(e.target.value)}
              required
            />

            <button type="submit" className="btn-comprar">Actualizar</button>
          </form>
        )}
      </main>
    );
  }

  // Si no hay ID, mostrar la lista de productos
  if (cargando) {
    return (
      <main>
        <p>Cargando productos...</p>
      </main>
    );
  }

  return (
    <main>
      <div className="contenedor-productos">
        {productos.length === 0 ? (
          <p>No hay productos disponibles</p>
        ) : (
          productos.map((producto) => (
            <div className="producto" key={producto.id}>
              <img className="producto-imagen" src={producto.url_imagen} alt={producto.nombre} />
              <div className="producto-detalles">
                <h3 className="producto-titulo">{producto.nombre}</h3>
                <p className="producto-precio">${producto.precio}</p>
                <p className="producto-stock">Stock: {producto.stock}</p>
                <div className="producto-botones">
                  <button 
                    className="producto-modificar"
                    onClick={() => modificarProducto(producto)}
                  >
                    Modificar
                  </button>
                  <button 
                    className="producto-eliminar"
                    onClick={() => eliminar(producto.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
