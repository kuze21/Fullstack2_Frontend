import { describe, it, expect, beforeEach, vi } from 'vitest'
import * as carritoService from '../services/carrito'

  //verifica que se envie post a la api con el productId y token
  it('agregarAlCarrito debe enviar POST con productId y token', async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true })
      })
    )
    global.fetch = mockFetch
    localStorage.setItem('token', 'test-token')

    await carritoService.agregarAlCarrito(5)

    expect(mockFetch).toHaveBeenCalledWith(
      'http://192.168.1.20:8080/api/cart/items/5',
      expect.objectContaining({
        method: 'POST',
        headers: { Authorization: 'Bearer test-token' }
      })
    )
  })

  //verifica que se envie delete a la api con el productId y token
  it('eliminarDelCarrito debe enviar DELETE con productId y token', async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true })
      })
    )
    global.fetch = mockFetch
    localStorage.setItem('token', 'test-token')

    await carritoService.eliminarDelCarrito(5)

    expect(mockFetch).toHaveBeenCalledWith(
      'http://192.168.1.20:8080/api/cart/items/5',
      expect.objectContaining({
        method: 'DELETE',
        headers: { Authorization: 'Bearer test-token' }
      })
    )
  })

  //verifica que se envie get a la api con el token
  it('obtenerCarrito debe incluir el token en headers', async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ items: [] })
      })
    )
    global.fetch = mockFetch
    localStorage.setItem('token', 'test-token')

    await carritoService.obtenerCarrito()

    expect(mockFetch).toHaveBeenCalledWith(
      'http://192.168.1.20:8080/api/cart',
      expect.objectContaining({
        method: 'GET',
        headers: { Authorization: 'Bearer test-token' }
      })
    )
  })

  //verifica que lanzar error NO_AUTH cuando status es 401
  it('debería lanzar NO_AUTH cuando status es 401', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ error: 'Unauthorized' })
      })
    )

    try {
      await carritoService.obtenerCarrito()
      expect.fail('Debería haber lanzado un error')
    } catch (error) {
      expect(error.message).toBe('NO_AUTH')
    }
  })
