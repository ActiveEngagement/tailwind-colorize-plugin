import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config'
import CallExpression from './ast/CallExpression';
import ColorExpression from './ast/ColorExpression';
import ExpressionChain from './ast/ExpressionChain';
import GetterExpression from './ast/PropertyExpression';
import CallExpression from './ast/CallExpression';
import { color } from './helpers';

const { theme } = resolveConfig(tailwindConfig);

import { analyze } from "./lexer";
import { parse } from "./parser";
import Token from "./Token";

/**
 * @todo Fix the following parsing scenarios:
 * 
 * '#fff.500' -> should throw a parse error. 500 weight cannot be defined with
 * a literal CSS color value.
 * 
 * 'rgb(255,255,255')' -> should parse as a function call.
 */

console.log(parse(theme, analyze('a.b.c.d(1,2)')));

// const exp = new ExpressionChain([
//     new ColorExpression('#000'),
//     // new GetterExpression('a'),
//     // new GetterExpression('b'),
//     // new MethodExpression('c', [1, 2]),
//     // new MethodExpression('d', [3, 4]),
// ]);

// const subject = new class Subject {
//     constructor() {
        
//     }

//     get a() {
//         return new class A {
//             get d() {
//                 return 'Success!'
//             }
//             test() {
//                 return this;
//             }
//         }
//     }

//     // a: {
//     //     b: {
//     //         c: (a: any, b: any) => {
//     //             console.log(a, b);
                
//     //             return {
//     //                 d: 1
//     //             }
//     //         }
//     //     }
//     // }
// };


// console.log('return ->', exp.toString())


