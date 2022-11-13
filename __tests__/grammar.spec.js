import { describe, expect, test } from '@jest/globals';
import { parse as base } from '../grammar';

function parse(value) {
    return base(value)
}

describe('Color Grammar', () => {
    test('a theme color with weight', () => {
        const [ color ] = parse('red.500');
        
        expect(color.id).toBe('ThemeColor');
        expect(color.name).toBe('red');
        expect(color.weight).toBe('500');
    });

    test('a theme color without weight', () => {
        const [ color ] = parse('black');
        
        expect(color.id).toBe('ThemeColor');
        expect(color.name).toBe('black');
        expect(color.weight).toBe(null);
    });

    test('a short 3 digit hex code', () => {
        const [ color ] = parse('#000');
        
        expect(color.id).toBe('ShortHexCode');
        expect(color.code).toBe('#000');
    });

    test('a long 6 digit hex code', () => {
        const [ color ] = parse('#000000');
        
        expect(color.id).toBe('LongHexCode');
        expect(color.code).toBe('#000000');
    });

    test('an RGB function', () => {
        const [ color ] = parse('rgb(100,255,255)');
        
        expect(color.id).toBe('RgbFunction');
        expect(color.code).toBe('rgb(100,255,255)');
    });

    test('an HSL function', () => {
        const [ color ] = parse('hsl(100.50%,0,15.5%)');
        
        expect(color.id).toBe('HslFunction');
        expect(color.code).toBe('hsl(100.50%,0,15.5%)');
    });
});