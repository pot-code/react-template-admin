/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extends: ["airbnb", "airbnb-typescript", "plugin:react-hooks/recommended", "plugin:prettier/recommended"],
  ignorePatterns: ["*.config.ts", "*.spec.ts", "*.d.ts", ".eslintrc.cjs"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "max-classes-per-file": "off",
    "no-bitwise": "off",
    "no-console": "warn",
    "no-empty-pattern": "warn",
    "no-param-reassign": "off",
    "no-plusplus": "off",
    "no-underscore-dangle": "warn",
    "no-unused-vars": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "import/prefer-default-export": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/naming-convention": "off",
    "jsx-a11y/click-events-have-key-events": "warn",
    "jsx-a11y/mouse-events-have-key-events": "warn",
    "jsx-a11y/no-static-element-interactions": "warn",
    "react/button-has-type": "off",
    "react/function-component-definition": "off",
    "react/jsx-no-bind": "warn",
    "react/jsx-props-no-spreading": "off",
    "react/no-array-index-key": "warn",
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
  },
}
