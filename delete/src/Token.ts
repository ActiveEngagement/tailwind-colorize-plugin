import { Grammar } from './types';

export default class Token {

    constructor(
        readonly grammar: Grammar,
        readonly index: number,
        readonly value: string
    ) {
        //
    }

    get id() {
        return this.grammar.id;
    }
}