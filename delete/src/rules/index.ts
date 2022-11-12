import { ParseRuleConstructor } from './../types';
import Color from './Color';
import Function from './Function';
import Literal from './Literal';
import Property from './Property';

const rules: ParseRuleConstructor[] = [
    Color,
    Literal,
    Property,
    // Function
];

export default rules;