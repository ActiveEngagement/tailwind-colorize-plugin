import { Grammar } from './types';

const grammar: Grammar[] = [
    {
      id: 'dot',
      pattern: /^(?!\d+)\./
    },
    {
      id: 'string',
      pattern: /^[#\w]+/
    },
    {
      id: 'open_paren',
      pattern: /^[(]/
    },
    {
      id: 'close_paren',
      pattern: /^[)]/
    },
    {
      id: 'comma',
      pattern: /^,/
    },
    {
      id: 'divide',
      pattern: /^\//
    },
    {
      id: 'comma',
      pattern: /^\,/
    },
    {
      id: 'literal',
      pattern: /^.+/
    }
]

export default grammar;