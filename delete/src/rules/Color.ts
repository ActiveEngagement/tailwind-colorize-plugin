// import color from 'color';
import { TokenRuleContext } from '../types';
import { color, is, isValidColor, next } from "../helpers";
import { ParseRule } from "../types";
import ColorExpression from '../ast/ColorExpression';

export default class Color implements ParseRule {
    castColor({ token, tokens, config }: TokenRuleContext): ColorExpression|never {
        const nextToken = next(tokens), weightToken = next(tokens, nextToken);

        return new ColorExpression(
            color(token, weightToken, config), token, weightToken
        );
    }

    validate({ token, tokens, config }: TokenRuleContext): boolean  {
        return is(token, 'string')
            && !is(next(tokens), 'open_paren')
            && isValidColor(token, config);
    }

    grammar() {
        return {
            string: (context: TokenRuleContext) => {
                const expression = this.castColor(context);
                
                context.chain.push(expression);
                context.use(expression.colorToken, expression.weightToken);
            }
        }
    }
};