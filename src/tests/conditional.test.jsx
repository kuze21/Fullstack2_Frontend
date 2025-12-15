import React from 'react'
import { render, screen } from '@testing-library/react'

// Componente mínimo para demostrar renderizado condicional
function ErrorMessage({ error }) {
  return error ? <div role="alert">{error}</div> : null
}

describe('Renderizado condicional', () => {
  it('muestra el mensaje de error solo cuando existe un error', () => {
    const { rerender } = render(<ErrorMessage error={null} />)
    expect(screen.queryByRole('alert')).toBeNull()

    rerender(<ErrorMessage error={'Ha ocurrido un error'} />)
    expect(screen.getByRole('alert')).toHaveTextContent('Ha ocurrido un error')
  })
})
