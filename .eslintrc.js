module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  globals: {
    graphql: true,
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'warn',
  },
}
