module.exports = {
  presets: [
    ["@babel/preset-env", { modules: false }],
    ["@babel/preset-react", {"runtime": "automatic"}],
    ['jest']
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties"
  ],
  env: {
    test: {
      plugins: ["@babel/plugin-transform-modules-commonjs"]
    },
    production: {
      only: ["src"],
      plugins: [
        [
          "transform-react-remove-prop-types",
          {
            removeImport: true
          }
        ],
        "@babel/plugin-transform-react-inline-elements",
        "@babel/plugin-transform-react-constant-elements"
      ]
    }
  }
};