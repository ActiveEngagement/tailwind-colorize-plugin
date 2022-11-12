{{
    function join(...args) {
        return args.flat().join('')
    }
}}

Start = Expression

Expression = Color MethodCall?

Number = decimal:"."? digits:([0-9]+) {
    return new function LiteralValue() {
        this.id = 'LiteralValue';
    	this.value = Number(join(decimal, ...digits))
    }
}

String = value: [a-zA-Z0-9]+ { return value.join('') }

HexChar = [0-9a-fA-F]

Color = ThemeColor/RgbFunction/LongHexCode/ShortHexCode/Number
ColorWeight = value:("." String)

ThemeColor = name:String weight:ColorWeight? {
    return new function ThemeColor() {
        this.id = 'ThemeColor';
        this.name = name;
        this.weight = weight && weight.pop();
    };
}

RgbFunction = value:('rgb(' [0-9]+ ',' [0-9]+ ',' [0-9] ')') {
    return value.join('')
}

LongHexCode = code:('#' HexChar HexChar HexChar HexChar HexChar HexChar) {
    return new function LongHexCode() {
        this.id = 'LongHexCode';
        this.code = join(code);
    }
}

ShortHexCode = code:('#' HexChar HexChar HexChar) {
    return new function ShortHexCode() {
        this.id = 'ShortHexCode';
        this.code = join(code);
    }
}

MethodCall = ("." fn: Function { return fn })*

Function = name:String "(" args:FunctionArguments ")" {
    return new function MethodCall() {
        this.id = 'MethodCall';
        this.name = name;
        this.args = args.map(([comma, arg]) => arg);
    }
}

FunctionArguments = (comma:","? (arg:Expression { return arg })) *