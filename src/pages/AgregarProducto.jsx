import { useState } from "react";
import { crearProducto } from "../services/producto.js";
import { useNavigate } from "react-router-dom";

export default function AgregarProducto() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [url_imagen, setImagen] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const nuevo = { nombre, precio: Number(precio), url_imagen };

    await crearProducto(nuevo);

    alert("Producto agregado correctamente");
    navigate("/productos");
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
          type="text"
          placeholder="urlImagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          required
        />

        <button type="submit" className="btn-comprar">Guardar</button>
      </form>
    </main>
  );
}
