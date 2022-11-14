
const resolveConfig = require('tailwindcss/resolveConfig');
const { parse } = require('./grammar');
const useTheme = require('./lib/useTheme');

module.exports = (opts = {
    config: undefined,
    configPath: './tailwind.config.js'
}) => {
    // Convert opts to an object if passed as a string. Assume the string is the
    // tailwindcss config path.
    if(typeof opts === 'string') {
        opts = {
            config: opts
        }
    }

    // Resolve the tailwind config.
    const tailwindConfig = opts.config || resolveConfig(require(opts.configPath));

    // Resolve the config and run useTheme() to get the instance.
    const { transform } = useTheme(resolveConfig(tailwindConfig));

    // Define the PostCSS plugin to parse the Decl values.
    return {
        postcssPlugin: 'tailwind-colorize-plugin',
        Declaration(decl) {
            try {
                decl.value = transform(parse(decl.value)).rgb().toString();
            }
            catch {
                // If there is an error, just ignore the declaration.
            }
        }
    }
}