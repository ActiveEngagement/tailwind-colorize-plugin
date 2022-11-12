export default class CallExpression {
    readonly args: any[];

    constructor(readonly method: string, ...args: any[]) {
        this.args = args;
    }

    toString() {
        return `${this.method}(${this.args.map(arg => arg.toString()).join(',')})`;
    }

    run(subject: any) {
        return subject[this.method](...this.args);
    }
}