module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "@typescript-eslint/no-explicit-any": ["off"],   // 允许使用any
    // "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "vue/no-mutating-props": "off",
    // "vue/no-parsing-error": "off"
    // 'vue/no-v-for-template-key': 'off'
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
}
