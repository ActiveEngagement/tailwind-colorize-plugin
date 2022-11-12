import Token from "../Token";

export default class LiteralExpression {
    readonly values: Token[];

    constructor(...values: (Token|undefined)[]) {
        this.values = values.filter<Token>((value) => {
            return value !== undefined;
        });
    }

    toString(): string {
        return this.values.map(({ value }) => value).join('');
    }

    run(): any {
        return this.values.map(({ value }) => value).join('');
    }
}