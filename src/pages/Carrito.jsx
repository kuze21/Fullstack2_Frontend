import { useEffect, useState } from "react";
import "./Carrito.css";
import { obtenerCarrito, eliminarDelCarrito, pagarCarrito } from "../services/carrito.js";
import { Link } from "react-router-dom";

export default function Carrito() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [accion, setAccion] = useState(false); // bloquea doble click al eliminar

    function calcularTotal(items) {
        return (items || []).reduce((acc, p) => acc + Number(p.precio || 0), 0);
    }

  async function cargarCarrito() {
    try {
      setCargando(true);
      setError(null);

      const cart = await obtenerCarrito();
      const lista = cart.items || [];

      setItems(lista);
      setTotal(calcularTotal(lista));
    } catch (e) {
      console.error(e);
      setError("No se pudo cargar el carrito. ¿Iniciaste sesión?");
      setItems([]);
      setTotal(0);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarCarrito();
  }, []);

  async function handleFinalizarCompra() {
    try {
      await pagarCarrito();
      alert("Compra realizada con éxito. ¡Gracias por tu compra!");
      setItems([]);
      setTotal(0);
    } catch (e) {
      alert("No se pudo completar la compra. Puede que no haya stock.");
    }
  }

  async function handleEliminar(productId) {
    try {
      setAccion(true);
      const cart = await eliminarDelCarrito(productId);
      const lista = cart.items || [];

      setItems(lista);
      setTotal(calcularTotal(lista));
    } catch (e) {
      console.error(e);
      setError("No se pudo eliminar el producto del carrito.");
    } finally {
      setAccion(false);
    }
  }

  if (cargando) {
    return (
      <main className="carrito">
        <h1>Carrito</h1>
        <p>Cargando carrito...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="carrito">
        <h1>Carrito</h1>
        <p className="carrito-error">{error}</p>
        <button className="carrito-btn" onClick={cargarCarrito}>
          Reintentar
        </button>
      </main>
    );
  }

  return (
    <main className="carrito">
        <div className="carrito-header">
            <h1>Carrito</h1>
            {items.length > 0 && (
            <Link className="carrito-link" to="/productos">
            ← Seguir comprando
            </Link>)}
        </div>
      {items.length === 0 ? (
        <div className="carrito-vacio">
          <p>Tu carrito está vacío.</p>
          <Link className="carrito-btn" to="/productos">
            Ver productos
          </Link>
        </div>
      ) : (
        <>
          <section className="carrito-lista">
            {items.map((p) => (
              <article className="carrito-item" key={p.id}>
                <Link to={`/producto/${p.id}`}>
                    <img className="carrito-imagen" src={p.url_imagen} alt={p.nombre} />
                </Link>

                <div className="carrito-info">
                  <h2 className="carrito-nombre">{p.nombre}</h2>
                  <p className="carrito-precio">${p.precio}</p>
                </div>

                <button
                  className="carrito-eliminar"
                  onClick={() => handleEliminar(p.id)}
                  disabled={accion}
                  title="Eliminar del carrito"
                >
                  {accion ? "..." : "Eliminar"}
                </button>
              </article>
            ))}
          </section>

          <aside className="carrito-resumen">
            <div className="carrito-total">
              <span>Total</span>
              <strong>${total}</strong>
            </div>
            <button 
              className="carrito-btn carrito-btn-principal"
              onClick={() => handleFinalizarCompra()}>
              Pagar
            </button>

            <p className="carrito-nota">
              * Cada juego solo puede estar 1 vez en el carrito.
            </p>
          </aside>
        </>
      )}
    </main>
  );
}
