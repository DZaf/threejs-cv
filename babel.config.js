// Babel configuration to transpile ES6+ JavaScript for Node.js (Jest test environment)
// '@babel/preset-env' allows us to use modern JavaScript features
// 'targets: { node: "current" }' ensures compatibility with the current Node version (used by Jest)
module.exports = {
    presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
};
