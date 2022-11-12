import grammar from './grammar';
import { useTheme } from './helpers';
import { generate } from 'peggy';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config'

const { execute } = useTheme(resolveConfig(tailwindConfig));

const parser = generate(grammar);

const [ subject, calls ] = parser.parse("red.100.mix(blue.500.fade(.1))");

console.log(execute(subject, calls))

// console.log();