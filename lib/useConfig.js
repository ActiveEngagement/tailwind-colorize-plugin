const Color = require('color');
const { parse:base } = require('../grammar');
const { get } = require('lodash');
const {default:toColorValue} = require('tailwindcss/lib/util/toColorValue');

module.exports = function useConfig(config = {}) {
    function transformArgument(arg) {
        if(Array.isArray(arg)) {
            return transform(arg);
        }
        
        switch(arg.id) {
            case 'ShortHexCode':
            case 'LongHexCode':
            case 'RgbFunction':
            case 'HslFunction':
                return Color(arg.code)
            case 'LiteralValue':
                return arg.value;
            case 'ThemeColor':
                return themeColor(arg.name, arg.weight)
        }
    }

    function transform([subject, calls]) {
        return calls.reduce((carry, call) => {
            const args = call.args.map(transformArgument)
                .filter((value) => value !== undefined);

            if(typeof carry[call.name] !== 'function') {
                throw new Error(`${call.name} is not a method on ${carry}`);
            }

            return carry[call.name](...args);
        }, transformArgument(subject))
    }

    function parseString(value) {
        value = toColorValue(value);
    
        try {
            return transform(base(value)).rgb().toString();
        }
        catch {
            return value;
        }
    };

    function parse(value) {
        if(typeof value === 'object') {
            for(let [key, value] of Object.entries(value)) {
                if(typeof value === 'string') {
                    obj[key] = parseString(value);
                }
                else if(typeof value === 'object' && value) {
                    parse(value)
                }
            }
        }

        return parseString(String(value));
    }

    function theme(path, defaultValue) {
        return get(config.theme, path, defaultValue);
    }

    function themeColor(path, weight, defaultValue) {
        const themePath = ['colors', path, weight]
            .filter(value => !!value)
            .join('.');
        
        const match = theme(themePath, defaultValue);

        if(typeof match === 'string') {
            return Color(match);
        }

        const keys = Object.keys(match || theme(themePath.split('.').slice(0, themePath.split('.').length - 1).join('.')));

        throw new Error(`"${path}" is not a valid theme color. You must give a valid modifier: ${keys}.`)
    }
    
    return {
        parse: value => parse(value)
    }
}