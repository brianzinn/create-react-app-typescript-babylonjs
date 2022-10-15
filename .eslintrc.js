module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    "plugin:react/recommended",
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
}