export default class ExpressionChain {
    constructor(
        protected readonly expressions: any[] = []
    ) {
        //
    }

    push(...expressions: any[]): this {
        this.expressions.push(...expressions.filter(value => value !== undefined));

        return this;
    }

    run(subject: any): any {
        return this.expressions.reduce((carry, call) => {
            return call.run(carry);
        }, subject);
    }

    toString(): string {
        return this.expressions.map(call => call.toString()).join('.');
    }
}