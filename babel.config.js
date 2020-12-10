module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-classes',
    '@babel/plugin-transform-destructuring',
    '@babel/plugin-transform-runtime',
    [ '@babel/plugin-proposal-object-rest-spread', { loose: true } ],
  ],
}
