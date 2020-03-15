module.exports = {
  root: true,

  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },

  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
  },

  plugins: ['vue', 'prettier', 'node', 'import', 'jest'],

  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
    '@vue/prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jest/recommended'
  ],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-else-return': ['error', { allowElseIf: false }],
    'no-multi-spaces': ['error', { ignoreEOLComments: false }],
    'prefer-template': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'prettier/prettier': ['error', { singleQuote: true, semi: false, trailingComma: 'es5' }],
    'curly': 'error',

    'vue/max-attributes-per-line': ['error', {
      singleline: 5,
      multiline: {
        max: 1,
        allowFirstLine: true
      }
    }],
    'vue/html-closing-bracket-newline': ['error', { multiline: 'always', singleline: 'never'}],
    'vue/html-closing-bracket-spacing': ['error', { selfClosingTag: 'always' }],
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/order-in-components': ['error'],
    'vue/script-indent': ['off', 2, { baseIndent: 0, switchCase: 0 }],

    'jest/no-disabled-tests': 'off',
  },

  overrides: [
    {
      files: [
        '**/components/*.spec.js?'
      ],
      env: {
        jest: true
      },
    },
    {
      files: ["*.vue"],
      rules: {
        indent: "off"
      }
    }
  ],

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.vue'],
        paths: ['./src']
      },
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.vue']
      }
    }
  }
}
