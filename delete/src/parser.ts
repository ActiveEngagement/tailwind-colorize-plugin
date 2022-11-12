import { get } from 'lodash-es';
import { ThemeConfig } from 'tailwindcss/types/config';
import ExpressionChain from './ast/ExpressionChain';
import rules from './rules';
import Token from './Token';
import { Node, ParseRule, ThemeGetter, ParseRuleConstructor, TokenRuleContext } from './types';

export class Parser {
    protected rules: ParseRule[];

    public usedTokens: Token[] = [];

    constructor(
        rules: ParseRuleConstructor[]
    ) {
        this.rules = rules.map(rule => new rule());
    }

    parse(config: Partial<ThemeConfig>|undefined, tokens: Token[], chain: ExpressionChain): ExpressionChain {
        // Clone the tokens array just to keep a copy of it for reference and
        // better error handling.
        const originalTokens = [...tokens];

        // Define an index since the while loop doesn't track the count iteration.
        let index: number = 0;

        // Define the theme() getter function.
        const theme: ThemeGetter = (path: string, defaultValue: any) => get(config, path, defaultValue);

        // Loop through the tokens while the index is less then the length.
        // We do this so we can potentially skip nodes using the parser.
        while(tokens.length) {        
            // Get the first token in the stack.
            const token = <Token> [...tokens].shift();
 
            // Get the context to pass to the grammar methods.
            const context: () => TokenRuleContext = () => ({
                config,
                index,
                chain,
                theme,
                token,
                tokens,
                parser: this,    
                usedTokens: this.usedTokens,            
                parse: (tokens: Token[], chain: ExpressionChain) => this.parse(config, tokens, chain),
                error: (title: string, value?: string) => {
                    if(!value) {
                        value = title;
                        title = `Could not parse "${originalTokens.map(token => token.value).join('')}"`;
                    }
                    else {
                        title += `: "${originalTokens.map(token => token.value).join('')}"`
                    }

                    throw new Error(`${title}\n\n${value}\n`);
                },
                use: (...used: (Token|undefined)[]): (Token|undefined)[] => {
                    const returnValue = [...used];

                    while(used.length) {
                        const token = <Token> used.shift();

                        if(tokens.includes(token)) {
                            tokens.splice(tokens.indexOf(token), 1);
                        }

                        if(!this.usedTokens.includes(token)) {
                            this.usedTokens.push(token);
                        }
                    }

                    return returnValue;
                }
            });

            // Loop through all the rules and attempt to process the token.
            for(const rule of this.rules) {
                // If the validate method is defined and returns false, then
                // continue on to the next rule.
                if(rule.validate?.(context()) === false) {
                    continue;
                }
                
                // Get the grammars for the rule.
                const grammars = rule.grammar({ theme, parser });

                // Check for the grammar specific handler
                if(grammars[token.id]) {
                    grammars[token.id](context())
                }
                // Check for the wildcard handler.
                else if(grammars['*']) {
                    grammars['*'](context())
                }

                // If there are no more tokens, or the token has been used,
                // then break out of the loop.
                if(!tokens.length || this.usedTokens.includes(token)) {
                    break;
                }
            }

            // Make sure we use the token. If it's already used, it will be
            // ignored.
            if(!this.usedTokens.includes(token)) {
                context().use(token);
            }
            
            // This the index with each loop iteration.
            index++;
        }

        return chain;
    }
}

export const parser = new Parser(rules);

export const parse = (theme: Partial<ThemeConfig>|undefined, tokens: Token[], chain?: ExpressionChain) => {
    return parser.parse(theme, tokens, chain || new ExpressionChain)
};