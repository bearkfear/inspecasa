module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json'
        ],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@assets': './assets',
          '@configs': './src/configs',
          '@views': './src/views',
          '@utils': './src/utils',
          '@styles': './src/styles',
          '@navigations': './src/navigations',
          '@store': './src/store'
        }
      }
    ]
  ]
}
