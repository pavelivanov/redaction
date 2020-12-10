module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-transform-destructuring',
    [ '@babel/plugin-proposal-object-rest-spread', { loose: true } ],
  ],
}
