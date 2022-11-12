import plugin from 'tailwindcss/plugin';
import { useTheme } from './src/helpers';

// @ts-ignore
import { parse } from './grammar.pegjs';

interface ColorizeOptions {
    prefix: (key: string) => string
}

export default function colorize(options: ColorizeOptions = {
    prefix(key: string) {
        return `${key}-colorize`
    }
}) {
    return plugin(({ config, matchUtilities, theme }) => {
        const props: Record<string,string> = theme('colorize.props');

        const { transform } = useTheme(config());

        for(const [key, prop] of Object.entries(props)) {
            matchUtilities({
                [options.prefix(key)]: value => {
                    const parsed = parse(value);

                    return {
                        [prop]: transform(parsed).hsl().toString()
                    };
                }
            }, {
                
            })
        }
    }, {
        theme: {
            colorize: {
                props: {
                    border: 'borderColor',
                    bg: 'backgroundColor',
                    text: 'color',
                }
            }
        }
    })
}