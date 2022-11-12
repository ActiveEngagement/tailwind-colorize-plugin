// import color from 'color';
import { TokenRuleContext } from '../types';
import { is, next, prev } from "../helpers";
import { ParseRule } from "../types";
import PropertyExpression from '../ast/PropertyExpression';

export default class Property implements ParseRule {
    
    validate({ usedTokens }: TokenRuleContext): boolean  {
        console.log(usedTokens.length);

        return usedTokens.length > 0;
    }
    
    grammar() {
        return {
            dot: ({ chain, error, token, tokens, use }: TokenRuleContext) => {
                const nextToken = next(tokens);
                
                console.log(nextToken);

                if(!nextToken || !is(nextToken, 'string')) {
                    throw error(`The "${token.value}" must be following by a string.`);
                }

                use(nextToken, token);

                chain.push(new PropertyExpression(nextToken));
            }
            
            // string: ({ token, chain, use }: TokenRuleContext) => {
            //     console.log(123);

            //     // chain.push(new PropertyExpression(...use(token)));
            // }
        }
    }
};