module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: ['airbnb-base', 'eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'react/display-name': 'off',
    'max-len': ['error', { code: 120, tabWidth: 2 }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-console': ['error', { allow: ['error'] }],
    // Un-used AirBnb rules
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'import/no-unresolved': 0,
    'no-underscore-dangle': 0,
    'no-use-before-define': 0,
    'func-names': 0,
    'global-require': 0,
    'no-param-reassign': 0,
    'comma-dangle': ['error', {
      arrays: 'ignore',
      objects: 'ignore',
      imports: 'ignore',
      exports: 'ignore',
      functions: 'ignore'
    }],
    'object-curly-newline': ['error', { consistent: true }],
    'no-shadow': 0,
    'operator-linebreak': ['error', 'before', { overrides: { '&&': 'after' } }],
    'no-unused-expressions': ['error', { allowTernary: true }],
    'arrow-parens': ['error', 'as-needed']
  },
  globals: {
    __DEV__: true,
    Platform: true
  }
};
