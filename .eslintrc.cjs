// .eslintrc.cjs
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard',
    'standard-jsx', // Para la sintaxis JSX
    'plugin:react/recommended', // Reglas recomendadas para React
    'plugin:react/jsx-runtime' // Si usas el nuevo runtime de React 17+ (Vite lo hace por defecto)
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  settings: {
    react: {
      version: 'detect' // Detecta automáticamente la versión de React
    }
  },
  rules: {
    // Aquí puedes sobreescribir reglas si lo necesitas.
    // Por ejemplo, si usas React 19, podrías necesitar ajustes específicos
    // o desactivar reglas que entren en conflicto.
    // 'react/prop-types': 'off' // Ejemplo: Desactivar prop-types si usas TypeScript o no los necesitas
  }
}
