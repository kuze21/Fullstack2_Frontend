export function loadCart() {
  try {
    const raw = localStorage.getItem('carrito')
    console.debug('[cart] loadCart raw:', raw)
    const parsed = JSON.parse(raw)
    console.debug('[cart] loadCart parsed:', parsed)
    return parsed || []
  } catch {
    return []
  }
}

export function saveCart(cart) {
  const str = JSON.stringify(cart)
  console.debug('[cart] saveCart ->', str)
  localStorage.setItem('carrito', str)
  // Notificar a la UI en la misma pestaña que el carrito cambió
  try {
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }))
  } catch (e) {
    // no-op en entornos donde window no esté disponible
  }
}

export function addToCart({ nombre, precio, imagen }) {
  const cart = loadCart()
  console.debug('[cart] addToCart received:', { nombre, precio, imagen })
  const existing = cart.find(p => p.nombre === nombre)
  if (existing) {
    existing.cantidad += 1
  } else {
    cart.push({ nombre, precio: Number(precio), imagen, cantidad: 1 })
  }
  saveCart(cart)
  alert(`${nombre} agregado al carrito`)
  return cart
}
