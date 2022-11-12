// import Color from "color";
import Color from "color";
import { get } from "lodash-es";
import { Config } from "tailwindcss/types/config";

// import Token from "./Token";
// import { ColorArgument } from "./types";

// export function is(token: Token[]|Token|undefined, type: string|string[]) {
//     if(!token) {
//         return false;
//     }

//     if(!Array.isArray(token)) {
//         token = [token];
//     }
    
//     if(!Array.isArray(type)) {
//         type = [type];
//     }

//     if(token.length < type.length) {
//         return false;
//     }

//     return token.reduce((carry, token, i) => {
//         return carry && token?.id === type[i]
//     }, true);
// }

// export function last(tokens: Token[], predicate?: number|string|Token|Record<string,any>): Token|undefined {
//     if(predicate === undefined) {
//         return tokens.reverse().shift();
//     }

//     if(typeof predicate === 'number') {
//         return tokens.reverse().slice(predicate).shift();
//     }

//     return find<Token|undefined>(tokens.reverse(), typeof predicate === 'string' ? {id: predicate} : predicate);
// }

// export function between(tokens: Token[], start: Token, end?: Token): Token[] {
//     return tokens.slice(tokens.indexOf(start) + 1, end ? tokens.indexOf(end) : undefined);
// }

export function useTheme({ theme: config }: Partial<Config>) {

    function execute(color: Color, calls: Function[]): Color {
        return calls.reduce((carry: any, call: any) => {
            let subject = call.args.shift();

            if(typeof subject === 'number') {
                return Color(carry[call.name]([subject, ...call.args]));
            }

            return execute(parseColor(subject), call.args);
        }, color);
    }

    function theme(path: string, defaultValue?: any) {
        return get(config, path, defaultValue);
    }

    function color(path: string, weight?: any, defaultValue?: any): Color {
        const themePath = ['colors', path, weight]
            .filter(value => !!value)
            .join('.');
        
        const match = theme(themePath, defaultValue);

        if(typeof match === 'string') {
            return Color(match);
        }

        throw new Error(`"${path}" is not a valid theme color. You must give a valid modifier: ${Object.keys(match)}.`)
    }

    function parseColor(value: any): Color {
        switch(value.constructor.name) {
            case 'ShortHexCode':
            case 'LongHexCode':
                return Color(value.code)
            case 'ThemeColor':
                return color(value.name, value.weight)
        }
    
        throw new Error(`${color.constructor.name} could be converted to a Color instance.`);
    }
    
    return {
        execute,
        color,
        parseColor,
        theme,
    };
}

// export function color(value: ColorArgument|ColorArgument[], config?: Partial<ThemeConfig>): Color {
//     // If the value is a string, split it using dot notation so we can extract
//     // the color and weight values.
//     if(typeof value === 'string') {
//         value = value.split('.');
//     }

//     // Make sure the value is an array.
//     if(!Array.isArray(value)) {
//         value = [value];
//     }

//     // Extract the color and weight values.
//     const [color, weight] = value.map(value => {
//         if(value instanceof Token) {
//             return value.value;
//         }

//         return value;
//     });

//     // Get the theme key from the given values.
//     const themeKey = [ color, weight].join('.').replace(/\.$/, '');

//     // Get the themed color.
//     const themeColor = theme(config, `colors.${themeKey}`);
    
//     if(typeof themeColor === 'object') {
//         throw new Error(`"${themeKey}" is not a valid theme color. You must give a valid modifier: ${Object.keys(themeColor)}.`)
//     }

//     // Convert the theme color or given value to a Color instance.
//     try {
//         return Color(`${themeColor || themeKey}`.replace(/\.$/, ''));
//     }
//     catch(e) {
//         throw new Error(`"${themeColor}" is not a valid theme or CSS color.`);
//     }
// }

// export function isValidColor(value: Token|string|undefined, weightToken: Token|string|undefined, config?: Partial<ThemeConfig>): boolean {
//     // If a value is passed as a Token instance, then convert it to a string.
//     if(value instanceof Token ) {
//         value = value.value;
//     }
    
//     if(theme(config, `colors.${value}`)) {
//         return true;
//     }

//     // Convert the theme color or given value to a Color instance.
//     try {
//         return !!Color(value);
//     }
//     catch {
//         return false;
//     }
// }

// export function matchingClosingParen(tokens: Token[], token: Token): Token|undefined {
//     let offset = 0;

//     return tokens.slice(tokens.indexOf(token)).find(token => {
//         if(is(token, 'open_paren')) {
//             offset++;
//         }

//         if(is(token, 'close_paren')) {
//             if(offset === 1) {
//                 return token;
//             }
            
//             offset--;
//         }

//         return undefined;
//     });
// }

// export function prepare(predicate?: number|string|Token|Record<string,any>) {
//     return typeof predicate === 'string' ? {id: predicate} : predicate;
// }

// export function after(tokens: Token[], predicate?: number|string|Token|Record<string,any>): Token[] {
//     if(predicate === undefined) {
//         return tokens.slice(0);
//     }

//     if(typeof predicate === 'number') {
//         return tokens.slice(predicate);
//     }
    
//     if(predicate instanceof Token) {
//         return tokens.slice(tokens.indexOf(predicate) + 1);
//     }

//     const token = find<Token|undefined>(tokens, prepare(predicate));

//     return tokens.slice((token ? tokens.indexOf(token) : -1) + 1);
// }

// export function next(tokens: Token[], predicate?: number|string|Token|Record<string,any>): Token|undefined {
//     if(predicate === undefined) {
//         return tokens.slice(1).shift();
//     }

//     if(typeof predicate === 'number') {
//         return tokens.slice(predicate).shift();
//     }
    
//     if(predicate instanceof Token) {
//         return tokens[tokens.indexOf(predicate) + 1];
//     }

//     return find<Token|undefined>(tokens.slice(1), prepare(predicate));
// }

// export function prev(tokens: Token[], predicate?: number|string|Token|Record<string,any>): Token|undefined {
//     if(predicate === undefined) {
//         return tokens.reverse().shift()
//     }
    
//     if(typeof predicate === 'number') {
//         return tokens.reverse().slice(predicate).shift()
//     }
    
//     if(predicate instanceof Token) {
//         return tokens[tokens.indexOf(predicate) - 1];
//     }

//     return find<Token|undefined>(tokens.reverse(), prepare(predicate));
// }