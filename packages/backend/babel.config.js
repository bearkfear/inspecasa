module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "8",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    ["@babel/plugin-transform-typescript", { legacy: true }],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties"],
    [
      "module-resolver",
      {
        alias: {
          "@": "./src",
        },
      },
    ],
  ],
  ignore: ["**/*.spec.ts"],
};
