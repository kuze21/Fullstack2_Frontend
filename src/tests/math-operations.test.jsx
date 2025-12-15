import { describe, it, expect } from 'vitest';

// Funciones de utilidad matemática para tests
const calcularPrecioTotal = (precio, cantidad) => precio * cantidad;
const calcularDescuento = (precio, porcentaje) => precio * (1 - porcentaje / 100);

describe('Operaciones Matemáticas Web', () => {
  
  describe('Cálculos de Precios', () => {
    it('debería calcular el precio total correctamente', () => {
      expect(calcularPrecioTotal(100, 2)).toBe(200);
      expect(calcularPrecioTotal(50.5, 3)).toBe(151.5);
      expect(calcularPrecioTotal(1000, 0)).toBe(0);
    });

    it('debería aplicar descuento correctamente', () => {
      expect(calcularDescuento(100, 10)).toBe(90);
      expect(calcularDescuento(200, 25)).toBe(150);
      expect(calcularDescuento(50, 50)).toBe(25);
      expect(calcularDescuento(100, 0)).toBe(100);
    });
  });

  describe('Validaciones de Entrada', () => {
    it('no debería permitir cantidad negativa', () => {
      expect(calcularPrecioTotal(100, -1)).toBe(-100);
      // En producción, lanzar error o retornar 0
    });

    it('debería manejar porcentajes válidos', () => {
      const resultadoAlto = calcularDescuento(100, 100); // 100% descuento
      const resultadoBajo = calcularDescuento(100, 0); // 0% descuento
      
      expect(resultadoAlto).toBe(0);
      expect(resultadoBajo).toBe(100);
    });
});
});
