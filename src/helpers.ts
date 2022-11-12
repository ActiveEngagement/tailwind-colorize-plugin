import Color from "color";
import { get } from "lodash-es";

export function useTheme({ theme: config }: any) {

    function transformArgument(arg: any) {
        switch(arg.id) {
            case 'ShortHexCode':
            case 'LongHexCode':
                return Color(arg.code)
            case 'LiteralValue':
                return arg.value;
            case 'ThemeColor':
                return themeColor(arg.name, arg.weight)
        }
    
        throw new Error(`${arg.id} is not a valid argument.`);
    }

    function transform([subject, calls]: [Color, Function[]]) {
        return calls.reduce((carry: any, call: any) => {
            const args = call.args.map((arg: any) => {
                if(Array.isArray(arg)) {
                    if(!arg.length) {
                        return;
                    }

                    return transform(<[Color, Function[]]> arg);
                }
                
                return transformArgument(arg);
            }).filter((value: any) => value !== undefined);

            if(typeof carry[call.name] !== 'function') {
                throw new Error(`${call.name} is not a method on ${carry}`);
            }

            return Color(carry[call.name](...args));
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

        if(match === undefined) {
            try {
                return Color(path);
            }
            catch {
                return path;
            }
        }

        if(typeof match === 'string') {
            return Color(match);
        }

        throw new Error(`"${path}" is not a valid theme color. You must give a valid modifier: ${Object.keys(match)}.`)
    }
    
    return {
        transform,
    };
}