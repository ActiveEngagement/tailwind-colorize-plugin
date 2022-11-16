
const plugin = require('tailwindcss/plugin');
const colors = require('./lib/colors');

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = plugin.withOptions((opts = {}) => {
    return ({ theme }) => {
        //
    }
}, () => ({
    theme: {
        extend: {
            colors
        }
    }
}))