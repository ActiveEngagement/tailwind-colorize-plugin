import { describe, expect,  test } from '@jest/globals';
import resolveConfig from 'tailwindcss/resolveConfig';
import useTheme from '../lib/useTheme';
import tailwindConfig from '../tailwind.config.js'
import { parse as base } from '../grammar';

// Resolve the config and run useTheme() to get the instance.
const { transform } = useTheme(resolveConfig(tailwindConfig));

function parse(value) {
    return transform(base(value)).hex().toString()
}

describe('the transform() function', () => {
    test('red.500 returns #EF4444', () => {
        expect(parse('red.500')).toBe('#EF4444')
    });

    test('red.500.lighten(.5) returns #FBD1D1', () => {
        expect(parse('red.500.lighten(.5)')).toBe('#FBD1D1')
    });

    test('#000.green(255).red(255).mix(rgb(0,0,0),.5).mix(red.500.lighten(.5),.1) returns #8C8815', () => {
        expect(parse('#000.green(255).red(255).mix(rgb(0,0,0),.5).mix(red.500.lighten(.5),.1)')).toBe('#8C8815')
    });

    test('various syntax errors', () => {
        expect(() => parse('')).toThrowError();
        expect(() => parse('a')).toThrowError();
        expect(() => parse('a.')).toThrowError();
        expect(() => parse('red.500()')).toThrowError();
        expect(() => parse('red.500.')).toThrowError();
        expect(() => parse('#f')).toThrowError();
        expect(() => parse('#zzz')).toThrowError();
        expect(() => parse('#ff')).toThrowError();
        expect(() => parse('#ffff')).toThrowError();
        expect(() => parse('#fffff')).toThrowError();
        expect(() => parse('#fff.foo().')).toThrowError();
        expect(() => parse('#fff.foo.bar')).toThrowError();
        expect(() => parse('#fff.foo(')).toThrowError();
        expect(() => parse('#fff.foo())')).toThrowError();
        expect(() => parse('#fff.foo(,)')).toThrowError();
        expect(() => parse('#fff.test()')).toThrowError();
        expect(() => parse('#fff.fade(.5),')).toThrowError();
        expect(() => parse('red')).toThrowError();
        expect(() => parse('red.25')).toThrowError();
        expect(() => parse('rgb')).toThrowError();
        expect(() => parse('rgb(')).toThrowError();
        expect(() => parse('rgb()')).toThrowError();
        expect(() => parse('rgb(,)')).toThrowError();
        expect(() => parse('rgb(1)')).toThrowError();
        expect(() => parse('rgb(1,)')).toThrowError();
        expect(() => parse('rgb(11a)')).toThrowError();
        expect(() => parse('rgb(1111)')).toThrowError();
        expect(() => parse('rgb(111,111)')).toThrowError();
        expect(() => parse('rgb(111,1111)')).toThrowError();
        expect(() => parse('rgb(111,111,1111)')).toThrowError();
        expect(() => parse('rgb(1,2,3,4)')).toThrowError();
        expect(() => parse('rgb(a,b,c)')).toThrowError();
        expect(() => parse('hsl')).toThrowError();
        expect(() => parse('hsl(')).toThrowError();
        expect(() => parse('hsl()')).toThrowError();
        expect(() => parse('hsl(1,)')).toThrowError();
        expect(() => parse('hsl(1,2)')).toThrowError();
        expect(() => parse('hsl(1,2,)')).toThrowError();
        expect(() => parse('hsl(1,2,3,)')).toThrowError();
        expect(() => parse('hsl(1,2,3,4)')).toThrowError();
        expect(() => parse('hsl(100.123%,100%,a)')).toThrowError();
        expect(() => parse('hsl(.100,100,100)')).toThrowError();
        expect(() => parse('hsl(..100,100,100)')).toThrowError();
        expect(() => parse('hsl(100,..100,100)')).toThrowError();
        expect(() => parse('hsl(100,100,..100)')).toThrowError();
        expect(() => parse('hsl(%100,100,100)')).toThrowError();
        expect(() => parse('hsl(100,%100,100)')).toThrowError();
        expect(() => parse('hsl(100,100,%100)')).toThrowError();
        expect(() => parse('hsl(100,100,100)')).toThrowError();
        expect(() => parse('hsl(a,b,c)')).toThrowError();
        expect(() => parse('hsl(1,b,c)')).toThrowError();
        expect(() => parse('hsl(1,2,c)')).toThrowError();
        expect(() => parse('hsl(1,2,c)')).toThrowError();
    });
});