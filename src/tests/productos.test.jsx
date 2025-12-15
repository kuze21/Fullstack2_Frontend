import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Productos from '../pages/Productos'
import * as cart from '../utils/cart'
import { vi } from 'vitest'

describe('Productos - Renderizado y eventos ', () => {
  it('renderiza todos los elementos del conjunto de datos', () => {
    render(<Productos />)
    const expected = ['Terraria', 'GTA V', 'Left 4 Dead 2', 'Outer Wilds']
    expected.forEach(t => expect(screen.getByText(t)).toBeInTheDocument())
  })

  it('al hacer click en Agregar llama a addToCart con los datos correctos', () => {
    const spy = vi.spyOn(cart, 'addToCart').mockImplementation(() => [])
    render(<Productos />)

    const botones = screen.getAllByText('Agregar')
    expect(botones.length).toBeGreaterThan(0)
    fireEvent.click(botones[0])

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith({ nombre: 'Terraria', precio: 10000, imagen: '/img/terraria.jpg' })

    spy.mockRestore()
  })
})
