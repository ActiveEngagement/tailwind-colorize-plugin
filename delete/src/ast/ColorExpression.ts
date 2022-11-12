import Color from 'color';
import Token from "../Token";

export default class ColorExpression {

    constructor(
        readonly color: Color,
        readonly colorToken: Token,
        readonly weightToken?: Token
    ) {
        //
    }
}