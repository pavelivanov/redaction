module.exports = {
  presets: [
    [ '@babel/env', { loose: true } ],
    process.env.NODE_ENV === 'test' && '@babel/react',
  ]
    .filter(Boolean),
  plugins: [
    '@babel/proposal-object-rest-spread',
  ],
}
