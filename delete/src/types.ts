import { ThemeConfig } from 'tailwindcss/types/config';
import ExpressionChain from './ast/ExpressionChain';
import { Parser } from './parser';
import Token from './Token';

export type ColorArgument = Token|string|undefined;

export type ThemeGetter = (key: string, defaultValue?: any) => any;

export interface BaseRuleContext {
    parser: Parser,
    theme: ThemeGetter
}

export interface TokenRuleContext extends BaseRuleContext {
    error: (title: string, value?: string) => void,
    index: number,
    chain: ExpressionChain,
    config: Partial<ThemeConfig>|undefined,
    token: Token,
    tokens: Token[],
    usedTokens: Token[],
    parse: (tokens: Token[], chain: ExpressionChain) => ExpressionChain,
    use: (...tokens: (Token|undefined)[]) => (Token|undefined)[]
}

export interface ParseRuleConstructor {
    new() : ParseRule
}

export interface ParseRule {
    validate?: (context: TokenRuleContext) => boolean,
    grammar: (context: BaseRuleContext) => {
        [key: string]: (context: TokenRuleContext) => void
    },
}

export interface Grammar {
    readonly id: string,
    readonly pattern: RegExp
}

export interface Node {
    // first(): Node|undefined
    // last(): Node|undefined
    // append(...nodes: Node[]): void
    // remove(...nodes: Node[]): void
}