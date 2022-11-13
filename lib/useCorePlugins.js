const useTheme = require('./useTheme');
const {default:flattenColorPalette} = require('tailwindcss/lib/util/flattenColorPalette');
const {default:toColorValue} = require('tailwindcss/lib/util/toColorValue');
const {default:withAlphaVariable} = require('tailwindcss/lib/util/withAlphaVariable');
const { parse } = require('../grammar');

module.exports = (context) => {
    const { config, corePlugins:hasCorePlugins, matchUtilities, theme } = context;
    const { transform } = useTheme(config());
    
    function parseString(value) {
        value = toColorValue(value);

        try {
            return transform(parse(value)).rgb().toString();
        }
        catch {
            return value;
        }
    }

    function parseTheme(obj) {
        for(let [key, value] of Object.entries(obj)) {
            if(typeof value === 'string') {
                obj[key] = parseString(value);
            }
            else {
                parseTheme(value)
            }
        }
    }

    parseTheme(config().theme);

    matchUtilities({ 
        bgx(value) {
            value = parseString(value);

            if (!hasCorePlugins('backgroundOpacity')) {
                return {
                    'background-color': value,
                }
            }

            return withAlphaVariable({
                color: value,
                property: 'background-color',
                variable: '--tw-bg-opacity',
            });
        }
    }, {
        values: flattenColorPalette(theme('backgroundColor')),
        type: ['color', 'any']
    });
    
    const { corePlugins } = require('tailwindcss/lib/corePlugins');

    corePlugins.backgroundColor(context)
    corePlugins.borderColor(context)
    corePlugins.textColor(context)    
};