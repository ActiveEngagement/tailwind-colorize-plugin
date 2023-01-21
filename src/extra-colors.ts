import colors from 'tailwindcss/colors';
import plugin from 'tailwindcss/plugin.js';

import { useColors } from './lib';

interface ExtraColorOptions {
    colors?: object,
    expand?: string[],
    interval?: number
}

export = plugin.withOptions((opts: ExtraColorOptions) => {
    return () => {
        //
    }
}, (opts) => {
    const { expand } = useColors(opts.colors || colors);

    return {
        theme: {
            extend: {
                colors: expand(opts.expand, opts.interval)
            }
        }
    }
})

// const plugin = require('tailwindcss/plugin');
// // const colors = require('./src/colors.js');

// console.log(1);
// /**
//  * @type {import('postcss').PluginCreator}
//  */
// module.exports = plugin.withOptions((opts = {}) => {
//     return ({ theme }) => {
//         console.log(opts);
//     }
// }, function (opts) {
//     console.log(opts);
// })