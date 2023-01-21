const { useConfig } = require('./lib.js');

/**
 * @type {import('postcss').PluginCreator}
 */
const plugin = configOrPath => {
    if (typeof configOrPath !== 'object') {
        throw new Error('You must pass the Tailwind config to the tailwind-colorize-plugin.')
    }

    // Run useConfig() to get the transformer.
    const { parse } = useConfig(configOrPath);

    // Define the PostCSS plugin to parse the Decl values.
    return {
        postcssPlugin: 'tailwind-colorize-plugin',
        Declaration(decl) {
            // decl.value = parse(decl.value);
        }
    }
};

plugin.postcss = true;

export = plugin;