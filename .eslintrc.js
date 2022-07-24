module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': 0,
    "indent": 0,
    'quotes': 0,
    'space-before-function-paren': 0,
    'key-spacing': 0,
    'comma-dangle': 0,
    'prefer-const': 0,
    'keyword-spacing': 0,
    'space-before-blocks': 0,
    'eqeqeq': 0,
    'eol-last': 0,
    "import/first": 0,
    'vue/multi-word-component-names': 0,
    'no-unused-vars': 0,
    'padded-blocks': 0,
    'no-trailing-spaces': 0,
    'no-undef': 0,
    'vue/no-dupe-keys': 0,
    'object-curly-spacing': 0,
    'vue/no-unused-vars': 0,
    'camelcase': 0,
    'no-unreachable-loop': 0,
    'no-empty': 0,
    'spaced-comment': 0,
    'no-use-before-define': 0,
    'quote-props': 0,
    'array-bracket-spacing': 0,
  }
}
