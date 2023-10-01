module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    ['@babel/plugin-proposal-optional-catch-binding'],
    [
      'module-resolver',
      {
        extensions: ['.ts', '.tsx', '.json'],
        alias: {
          "@utils": "./src/utils",
          "@screens": "./src/screens",
          "@images": "./src/assets/images",
          "@components": "./src/components",
        },
      },
    ],
  ],
};
