import { get } from 'lodash-es';
import Token from '../Token';

export default class PropertyExpression {
    constructor(
        readonly token: Token
    ) {
        //
    }

    toString(): string {
        return this.token.value;
    }

    run(subject: any): any {
        return get(subject, this.toString());
    }
}