module.exports = {
  testRegex: '.*.spec.js$',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  roots: [
    '<rootDir>/test'
  ],
  moduleFileExtensions: [
    'js',
  ],
  moduleDirectories: [
    'node_modules',
  ],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
  ]
}
