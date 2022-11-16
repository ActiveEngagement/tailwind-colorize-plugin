const fs = require('fs');
const path = require('path');
const resolveConfig = require('tailwindcss/resolveConfig');

function isESM() {
  const pkgPath = path.resolve('./package.json')

  try {
    let pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
    return pkg.type && pkg.type === 'module'
  } catch (err) {
    return false
  }
}

module.exports = function(configOrPath) {
  if(typeof configOrPath === 'object') {
    return configOrPath;
  }

  const filename = `./tailwind.config.${isESM() ? 'cjs' : 'js'}`

  return resolveConfig(require(path.resolve(configOrPath || filename)));
}