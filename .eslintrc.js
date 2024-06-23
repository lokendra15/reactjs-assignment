module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  parserOptions: {
    allowImportExportEverywhere: true,
    ecmaVersion: 2023,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }], // Allow JSX to be present in files with either a .js or .jsx extension
    'react/react-in-jsx-scope': 'off', // Allow jsx to be run even if there is no React imported
    eqeqeq: 'error', // Enforce using === and !== over == and !=
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }], // Disallow unused variables,
    'key-spacing': ['error', { beforeColon: false, afterColon: true }], // Enforce spacing around colon in object literals,
    quotes: ['error', 'single'], // or 'double'
    'react/prop-types': 0,
    'react/no-unescaped-entities': 'off',
  },
};
