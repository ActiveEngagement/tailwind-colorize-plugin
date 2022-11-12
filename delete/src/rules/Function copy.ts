import CallExpression from '../ast/CallExpression';
import { between, is, matchingClosingParen, next } from "../helpers";
import { ParseRule, TokenRuleContext } from "../types";
import Token from '../Token';

export default class Function implements ParseRule {
    // before() {
    //     console.log('before');
    // }
    // after() {
    //     console.log('after');
    // }
    // ignore() {
    //     return !this.opened;
    // }
    
    grammar() {
        return {
            string: ({ use, token, tokens, index, error }: TokenRuleContext) => {
                const nextToken = next(tokens);

                if(nextToken && is(nextToken, 'open_paren')) {
                    const closingToken = matchingClosingParen(tokens, nextToken);

                    if(closingToken) {
                        const methodTokens = between(tokens, nextToken, closingToken);

                        const { args } = methodTokens.reduce((carry: {index: number, args: Token[][]}, token: Token) => {
                            if(token.id === 'comma') {
                                carry.index++;
                            }
                            else {
                                if(!carry.args[carry.index]) {
                                    carry.args[carry.index] = [];
                                }

                                carry.args[carry.index].push(token);
                            }

                            return carry;
                        }, {index: 0, args: []});

                        const expression = new CallExpression(token.value);

                        for(let arg of args) {
                            console.log(arg);
                        }

                        use(...methodTokens);

                        return;
                    };

                    error(`The "(" at ${index + 1} doesn't have a matching ")".`);
                }
                
            }
        }
    }
};