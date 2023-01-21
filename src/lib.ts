import Color from 'color';
import get from 'lodash/get.js';
import toColorValue from 'tailwindcss/lib/util/toColorValue.js';
import baseResolveConfig from 'tailwindcss/resolveConfig';
import grammar from '../grammar.js';

export function useColors(colors: object) {
    return useConfig({
        theme: {
            colors
        }
    })
}

export function useConfig(config: object): any {
    config = baseResolveConfig(config);

    function transformArgument(arg: any) {
        if (Array.isArray(arg)) {
            return transform(<[any,any]> arg);
        }
        
        switch (arg.id) {
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

            if (typeof carry[call.name] !== 'function') {
                throw new Error(`${call.name} is not a method on ${carry}`);
            }

            return carry[call.name](...args);
        }, transformArgument(subject))
    }

    function parse(value) {
        value = toColorValue(value);

        try {
            return transform(grammar.parse(value)).rgb().toString();
        }
        catch (e) {
            return value;
        }
    };

    // function parse(subject) {
    //     return parseString(String(subject));
    // }

    function themeColor(path: string, weight: string|number, defaultValue?: any): any {
        const parsedPath = [path, weight].filter(value => !!value).join('.');
        const color = get(config.theme.colors, parsedPath, defaultValue);

        if (!color) {
            return;
        }

        return Color(color);
    }

    function expand(values?: string|string[], interval: number = 10) {
        if(!values) {
            values = Object.keys(config.theme.colors)
        }

        function decimal(i: any, start: any): number {
            i = parseInt(i);

            start = parseInt(start);

            return start < 100 ? i / 100 : (i - start) / 100;
        }

        function walk([start, color], remaining) {
            const [next] = remaining, items = [
                [start, color]
            ];

            for (let i = parseInt(start) + interval; i < parseInt(next[0]); i += interval) {
                items.push([i, () => Color(color).mix(Color(next[1]), decimal(i, start)).rgb().toString()]);
            }

            const unordered = items.reduce((carry, [i, item]) => Object.assign(carry, { [i]: item }), {});

            const ordered = Object.keys(unordered).sort().reduce(
                (obj, key) => {
                    obj[key] = unordered[key];
                    return obj;
                },
                {}
            );

            return ordered
        }
        
        return Object.fromEntries(
            [].concat(values)
                .map(value => [value, Object.entries(config.theme.colors[value])])
                .map(([key, colors]) => {
                    const subject = {};

                    while (colors.length > 1) {
                        Object.assign(subject, walk(colors.shift(), colors));
                    }

                    return [key, subject]
                })
        );
    }

    return {
        config,
        expand,
        parse,
        themeColor,
        transform
    }
}
