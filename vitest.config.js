import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'src/tests/setupTests.js',
    // Ejecutar únicamente archivos con convención .test.js/.test.jsx
    include: ['src/tests/**/*.test.{js,jsx}']
  }
})
