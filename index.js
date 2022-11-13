const plugin = require('tailwindcss/plugin');
const {default:flattenColorPalette} = require('tailwindcss/lib/util/flattenColorPalette');
const {default:toColorValue} = require('tailwindcss/lib/util/toColorValue');
const {default:withAlphaVariable} = require('tailwindcss/lib/util/withAlphaVariable');

const { parse } = require('./grammar');
const useTheme = require('./lib/useTheme');
const useCorePlugins = require('./lib/useCorePlugins');

const defaultOptions = {
    key: 'colorize',
    parseTheme: true,
    props: [{
        selector: 'bg',
        property: 'background',
        themeKey: 'backgroundColor'
    }]
};

module.exports = plugin.withOptions((options = {}) => {
    Object.assign(options, defaultOptions, options);

    return (context) => {
        // If there is a better way to do this, please let me know. The
        // reason this is here is because the core plugins are defined before
        // the plugins, so any changes to the theme will mean the utilities
        // will have to be reinstantiated.
        useCorePlugins(context);
    }
}, (options = {}) => {
    Object.assign(options, defaultOptions, options);

    return {
        theme: {
            [options.key]: {
                // Define an empty object
            }
        }
    }
});