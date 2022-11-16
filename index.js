const path = require('path');
const { parse } = require('./grammar');
const resolveConfig = require('./lib/resolveConfig');
const useConfig = require('./lib/useConfig');

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = configOrPath => {
    const config = resolveConfig(configOrPath)

    // Run useResolvedConfig() to get the transformer.
    const { parse } = useConfig(config);

    // Define the PostCSS plugin to parse the Decl values.
    return {
        postcssPlugin: 'tailwind-colorize-plugin',
        Declaration(decl) {
            try {
                decl.value = parse(decl.value);
            }
            catch {
                // If there is an error, just ignore the declaration.
            }
        }
    }
};

module.exports.postcss = true;