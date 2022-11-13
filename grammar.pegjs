{{
    function join(...args) {
        return args.flat().join('')
    }
}}

Start
    = Expression

Expression
    = Color MethodCall?

Digit
	= [0-9]

Number
    = decimal:"."? digits:(Digit+) {
        return new function LiteralValue() {
            this.id = 'LiteralValue';
            this.value = Number(join(decimal, ...digits))
        }
    }

String
    = value: [a-zA-Z0-9]+ { return value.join('') }
    
Letters
    = value: ([a-zA-Z] String) { return value.join('') }

HexChar
    = [0-9a-fA-F]

Color
    = RgbFunction/HslFunction/ThemeColor/LongHexCode/ShortHexCode/Number

ColorWeight
    = "." value:String !'(' { return value }

ThemeColor
    = name:Letters weight:ColorWeight? {
        return new function ThemeColor() {
            this.id = 'ThemeColor';
            this.name = name;
            this.weight = weight;
        };
    }

RgbValue
    = value: (Digit Digit? Digit?) { return join(value) }

RgbFunction
    = value:('rgb(' RgbValue ',' RgbValue ',' RgbValue ')') {
        return new function RgbFunction() {
            this.id = 'RgbFunction';
            this.code = join(...value)
        }
    }

HslValue
    = value:([.]? [0-9.]+ '%'?) { return join(...value) }

HslFunction
    = value:('hsl(' HslValue "," HslValue "," HslValue ')') {
        return new function HslFunction() {
            this.id = 'HslFunction';
            this.code = join(...value)
        }
    }

LongHexCode
    = code:('#' HexChar HexChar HexChar HexChar HexChar HexChar) {
        return new function LongHexCode() {
            this.id = 'LongHexCode';
            this.code = join(code);
        }
    }

ShortHexCode
    = code:('#' HexChar HexChar HexChar) {
        return new function ShortHexCode() {
            this.id = 'ShortHexCode';
            this.code = join(code);
        }
    }

MethodCall
    = ("." fn: Function { return fn })*

Function
    = name:String "(" args:FunctionArguments ")" {
        return new function MethodCall() {
            this.id = 'MethodCall';
            this.name = name;
            this.args = args.map(([comma, [subject, calls]]) => {
                if(calls.length) {
                    return [subject, calls];
                }

                return subject;
            });
        }
    }

FunctionArguments
    = (comma:","? (arg:Expression { return arg })) *