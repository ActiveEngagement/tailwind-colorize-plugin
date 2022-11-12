import resolveConfig from 'tailwindcss/resolveConfig';

// @ts-ignore
import { parse } from '../grammar.pegjs';

// @ts-ignore
import tailwindConfig from '../tailwind.config.js'

import { useTheme } from './helpers';

// Resolve the config and run useTheme() to get the instance.
const { transform } = useTheme(resolveConfig(tailwindConfig));

// Transform the parsed AST into a Color object.
const parsed = parse("red.100.mix(yellow.500,.1)");

console.log(transform(parsed).toString())