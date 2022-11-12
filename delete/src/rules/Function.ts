import CallExpression from '../ast/CallExpression';
import { between, is, matchingClosingParen, next } from "../helpers";
import { ParseRule, TokenRuleContext } from "../types";
import Token from '../Token';

export default class Function implements ParseRule {

    static opens: Function[] = [];

    validate({ token, tokens }: TokenRuleContext): boolean  {
        return is(next(tokens), 'open_paren')
            || is(token, 'close_paren')
            || is(token, 'comma');
    }

    grammar() {
        return {
            string: ({ use, token, tokens, index, error, chain }: TokenRuleContext) => {
                chain.push(new CallExpression(token.value));
            }
        }
    }
    
};