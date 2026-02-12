module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@features': './src/features',
            '@services': './src/services',
            '@store': './src/store',
            '@hooks': './src/hooks',
            '@constants': './src/constants',
            '@types': './src/types',
          },
        },
      ],
    ],
  };
};
