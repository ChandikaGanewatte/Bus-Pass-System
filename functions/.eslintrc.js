module.exports = {
  root: true,
  env: {
    node: true,        // ✅ enables Node globals like require, module, exports
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  extends: ["eslint:recommended"],
  rules: {},
};
