import { useState } from "react";
import { crearProducto } from "../services/producto.js";
import { useNavigate } from "react-router-dom";

export default function AgregarProducto() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [url_imagen, setUrlImagen] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const nuevo = { nombre, precio: Number(precio), stock: Number(stock), url_imagen };

    try {
      await crearProducto(nuevo);

      // limpia los campos del formulario
      setNombre("");
      setPrecio("");
      setStock("");
      setUrlImagen("");

      alert("Producto agregado correctamente");

      navigate("/productos");
    } catch (error) {
      console.error(error);
      alert("Error al agregar el producto");
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Agregar Producto</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400 }}
      >

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
          placeholder="urlImagen"
          value={url_imagen}
          onChange={(e) => setUrlImagen(e.target.value)}
          required
        />

        <button type="submit" className="btn-comprar">Guardar</button>
      </form>
    </main>
  );
}
