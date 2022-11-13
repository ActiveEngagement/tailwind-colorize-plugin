import Color from "color";
import { get } from "lodash";

export function useTheme({ theme: config }: any) {

    function transformArgument(arg: any) {
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

    function transform([subject, calls]: [Color, Function[]]) {
        return calls.reduce((carry: any, call: any) => {
            const args = call.args.map(transformArgument);

            if(typeof carry[call.name] !== 'function') {
                throw new Error(`${call.name} is not a method on ${carry}`);
            }

            return carry[call.name](...args);
        }, transformArgument(subject))
    }

    function theme(path: string, defaultValue?: any) {
        return get(config, path, defaultValue);
    }

    function themeColor(path: string, weight?: any, defaultValue?: any): Color|string {
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
        transform,
    };
}