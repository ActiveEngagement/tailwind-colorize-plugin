// import color from 'color';
import { TokenRuleContext } from '../types';
import { is, next, prev } from "../helpers";
import { ParseRule } from "../types";
import LiteralExpression from '../ast/LiteralExpression';

export default class Literal implements ParseRule {
    
    validate({ tokens, usedTokens }: TokenRuleContext): boolean  {
        return !prev(usedTokens) && !is(next(tokens), 'open_paren');
    }
    
    grammar() {
        return {
            dot: ({ chain, token, tokens, use }: TokenRuleContext) => {
                const nextToken = next(tokens);

                if(nextToken && is(nextToken, 'string') && nextToken.value.match(/^\d/)) {
                    chain.push(new LiteralExpression(...use(token, nextToken)));
                }
            },
            string: ({ token, chain, use }: TokenRuleContext) => {
                chain.push(new LiteralExpression(...use(token)));
            }
        }
    }
};