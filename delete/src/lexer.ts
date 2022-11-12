import grammar from './grammar-old';
import Token from "./Token";
import { Grammar } from './types';

export class Lexer {
    constructor(
        readonly grammar: Grammar[]
    ) {
        //
    }
    
    add(...grammars: Grammar[]): void {
        this.grammar.push(...grammars);
    }
    
    remove(...grammars: Grammar[]): void {
        for(const grammar of grammars) {
            this.grammar.splice(this.grammar.indexOf(grammar), 1);
        }
    }

    analyze(value: string): Token[] {
        // Copy the string instance.
        const originalValue = String(value);
        
        // Start the index at zero and increment as we parse the string.
        let index: number = 0, token: Token;

        // Define the tokens and next
        const tokens: Token[] = [];
        
        // The next function will convert the string into tokens. If no match
        // an Error will be thrown.
        const next = (): Token => {
            for(let grammar of this.grammar) {
                const matches = value.match(grammar.pattern);
    
                if(matches) {
                    return new Token(
                       grammar, index, value.substring(0, matches[0].length)
                    );
                }
            }
    
            // If the grammar did not match, then we end up here and need to throw the error.
            throw new Error(`"${originalValue}" cannot be parsed. The char "${originalValue.slice(index, index + 1)}" on ${index} is invalid.`)
        }

        while(token = next()) {
            index += token.value.length;

            value = value?.substring(token.value.length);
    
            tokens.push(token);

            if(!value) {
                break;
            }
        }
        
        return tokens;
    }
}

export const lexer = new Lexer(grammar);
export const analyze = (value: string) => lexer.analyze(value);
export const add = (...grammars: Grammar[]) => lexer.add(...grammars);
export const remove = (...grammars: Grammar[]) => lexer.remove(...grammars)