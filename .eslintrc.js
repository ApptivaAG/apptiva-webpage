module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'prettier'],
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
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-nested-ternary': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/jsx-filename-extension': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      { components: ['Link'], specialLink: ['to'] },
    ],
  },
}
