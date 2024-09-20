module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  root: true,
  env: { browser: true, es2020: true },
  "extends": [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:react/recommended",
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "react/react-in-jsx-scope": "off",
    "import/no-extraneous-dependencies": "off",
    "import/extensions": 0,
    "import/prefer-default-export": "off",
    "react/function-component-definition": "off",
    "react/require-default-props": 0,
    "react/jsx-props-no-spreading": 0,
    "react/button-has-type": 0,
    "jsx-a11y/control-has-associated-label": 0,
    "no-param-reassign": 0,
    "react-hooks/exhaustive-deps": 'warn',
    "no-case-declarations": 0
  },
}
