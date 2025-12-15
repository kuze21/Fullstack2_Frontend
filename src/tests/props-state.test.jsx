import React, { useState } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

// Ejemplo de prueba para props (botón) y estado (form)
function SimpleButton({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>
}

function SimpleForm() {
  const [value, setValue] = useState('')
  return (
    <div>
      <input
        aria-label="input-test"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <p data-testid="display">{value}</p>
    </div>
  )
}

describe('Props y State', () => {
  it('el componente Button recibe label y llama a onClick', () => {
    const mock = vi.fn()
    render(<SimpleButton label="Click me" onClick={mock} />)
    const btn = screen.getByText('Click me')
    fireEvent.click(btn)
    expect(mock).toHaveBeenCalled()
  })

  it('el estado del formulario cambia al introducir texto', () => {
    render(<SimpleForm />)
    const input = screen.getByLabelText('input-test')
    fireEvent.change(input, { target: { value: 'hola' } })
    expect(screen.getByTestId('display')).toHaveTextContent('hola')
  })
})
